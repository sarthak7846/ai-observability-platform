import 'dotenv/config';
import { Prisma, prisma } from "@observe/db";
import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "observe-analytics-worker",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({
  groupId: "observe-trace-worker",
});

export const startKafkaConsumer = async () => {
  await consumer.connect();

  await consumer.subscribe({
    topic: "trace.created",
    fromBeginning: false,
  });

  await consumer.run({
    // eachMessage: async ({ topic, partition, message }) => {
    //   if (!message.value) return;

    //   try {
    //     const trace = JSON.parse(message.value.toString());

    //     if (!trace.traceId || !trace.projectId) {
    //       throw new Error("Invalid trace: missing traceId or projectId");
    //     }
    //     const createdTrace = await prisma.trace.create({
    //       data: trace,
    //     });
    //     console.log("Received trace and saved to db", trace, createdTrace);
    //   } catch (error) {
    //     if (
    //       error instanceof Prisma.PrismaClientKnownRequestError &&
    //       error.code === "P2002"
    //     ) {
    //       console.warn(
    //         "Trace already exists, skipping duplicate",
    //       );
    //       return;
    //     }
    //     console.error("Failed to process trace", error);
    //     throw error;
    //   }
    // },

    eachBatch: async ({ batch, resolveOffset, commitOffsetsIfNecessary }) => {
      const traces: Prisma.TraceCreateManyInput[] = [];

      for (const message of batch.messages) {
        if (!message.value) continue;

        const trace = JSON.parse(message.value.toString());

        if (!trace.traceId || !trace.projectId) {
          throw new Error(
            "Invalid trace: missing traceId or projectId",
          );
        }

        traces.push(trace);
      }

      if (traces.length === 0) return;

      await prisma.trace.createMany({
        data: traces,
        skipDuplicates: true
      });

      for (const message of batch.messages) {
        resolveOffset(message.offset);
      }

      await commitOffsetsIfNecessary();

      console.log(`Saved ${traces.length} traces`)
    }
  });
};

const shutdown = async () => {
  console.log('Shutting down worker...');
  try {
    await prisma.$disconnect();
    await consumer.disconnect();
    console.log('Worker shutdown successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown', error);
    process.exit(1);
  }
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown)
