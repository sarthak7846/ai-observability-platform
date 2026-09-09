import 'dotenv/config';
import { prisma } from "@observe/db";
import { Kafka } from "kafkajs";


// export const callPrisma = async () => {
//   const createdTrace = await prisma.trace.findMany();
//   console.log('created trace', createdTrace)
// }


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
    eachMessage: async ({ topic, partition, message }) => {
      if (!message.value) return;

      const trace = JSON.parse(message.value.toString());

      const createdTrace = await prisma.trace.create({
        data: trace,
      });
      console.log("Received trace", trace, createdTrace);
    },
  });
};
