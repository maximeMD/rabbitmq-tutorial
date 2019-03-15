"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
// Connect to RabbitMQ server
callback_api_1.default.connect('amqp://localhost', (err, conn) => {
    // Create a channel
    conn.createChannel((errorCreateChannel, ch) => {
        // Set a name for he queue
        const queue = 'hello';
        // Declare the queue to send to
        ch.assertQueue(queue, { durable: false });
        console.log('Waiting for messages in %s ...', queue);
        // Listen on the queue every incoming message, and display it
        ch.consume(queue, (message) => {
            console.log('[x] Received %s', message ? message.content.toString() : '');
        }, { noAck: true });
    });
});
