/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Kafka, logLevel } from 'kafkajs';
// import { handleEvent } from './socket/eventHandler';
export async function startConsumer() {
  const kafka = new Kafka({
    logLevel: logLevel.INFO,
    brokers: ['192.168.8.165:9092', '192.168.8.166:9092', '192.168.8.167:9092'],
    connectionTimeout: 3000,
    clientId: 'Torii-gRPC-Dragark',
  });

  const topic = 'dragark-torii-entity';
  const consumer = kafka.consumer({ groupId: topic });
  const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: false });
    await consumer.run({
      eachMessage: async (dataKafka) => {
        const message = JSON.parse(dataKafka.message.value.toString());
        console.log(message);
        // handleEvent(message);
        // exit();
      },
    });
  };

  await run().catch((e) => console.error(`[test/consumer] ${e.message}`, e));

  const errorTypes = ['unhandledRejection', 'uncaughtException'];
  const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2'];

  errorTypes.forEach((type) => {
    process.on(type, async (e) => {
      try {
        console.log(`process.on ${type}`);
        console.error(e);
        await consumer.disconnect();
        process.exit(0);
      } catch (_) {
        process.exit(1);
      }
    });
  });

  signalTraps.forEach((type) => {
    process.once(type, async () => {
      try {
        await consumer.disconnect();
      } finally {
        process.kill(process.pid, type);
      }
    });
  });
}
