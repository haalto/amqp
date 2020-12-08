/* 
This service is responsible for sending messages to rabbitmq
*/

import amqp from 'amqplib/callback_api.js';
import fetch from 'node-fetch';

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

let state = 'PAUSED';

async function init() {
  await sleep(10000);
  amqp.connect('amqp://rabbitmq:5672', (err, connection) => {
    if (err) throw err;
    connection.createChannel(async (err, channel) => {
      if (err) throw err;
      const exchange = 'my';
      const key = 'my.o';
      channel.assertExchange(exchange, 'topic', {
        durable: false,
      });
      let i = 0;

      while (true) {
        //Poll state server to get the application state
        const response = await fetch('http://stateserv:9000/state');
        state = await response.text();

        //Send messages only when state is "RUNNING"
        if (state === 'RUNNING') {
          await sleep(3000);
          const message = `MSG_${i}`;
          channel.publish(exchange, key, Buffer.from(message));
          i++;
        }
      }
    });
  });
}

init();
