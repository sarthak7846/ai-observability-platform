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
    eachMessage: async ({ topic, partition, message }) => {
      if (!message.value) return;

      const trace = JSON.parse(message.value.toString());

      console.log("Received trace", trace);
    },
  });
};
