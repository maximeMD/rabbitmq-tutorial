import amqp from 'amqplib/callback_api';

// Connect to RabbitMQ server
amqp.connect('amqp://localhost', (err, conn) => {
  // Create a channel
  conn.createChannel((errorCreateChannel, ch) => {
    // Set a name for he queue
    const queue = 'hello';
    // Declare the queue to send to
    ch.assertQueue(queue, { durable: false });
    // Send a message
    ch.sendToQueue(queue, Buffer.from('Hello World <(^(o_o)^)> !!'));
    console.log('[x] Sent a message');
  });
  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 500);
});
