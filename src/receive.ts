import amqp from 'amqplib/callback_api';

// Connect to RabbitMQ server
amqp.connect('amqp://localhost', (err, conn) => {
  // Create a channel
  conn.createChannel((errorCreateChannel, ch) => {
    // Set a name for he queue
    const queue = 'hello';
    // Declare the queue to send to
    ch.assertQueue(queue, { durable: false });

    console.log('Waiting for messages in %s ...', queue);
    // Listen on the queue every incoming message, and display it
    ch.consume(
      queue,
      (message: amqp.Message | null) => {
        console.log(
          '[x] Received %s',
          message ? message.content.toString() : '',
        );
      },
      { noAck: true },
    );
  });
});
