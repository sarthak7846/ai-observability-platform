import { startKafkaConsumer } from "./kafka.consumer";

startKafkaConsumer().catch((err) => {
  console.error('Kafka consumer failed', err);
  process.exit(1);
})