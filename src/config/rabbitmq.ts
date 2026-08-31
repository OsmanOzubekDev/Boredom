import amqp from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672';
const QUEUE_NAME = 'book_notifications';

export const sendBookNotification = async (message: object) => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)));

    console.log(`[RabbitMQ] Sent message to ${QUEUE_NAME}:`, message);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error('[RabbitMQ] Error sending message:', error);
  }
};