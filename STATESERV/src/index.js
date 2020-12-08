/* 
This service keeps track of the application state and serves other services state changes
*/

import http from 'http';
import fs, { write } from 'fs';
const PORT = 9000;
const FILENAME = 'logs.txt';
let state = 'INIT';

http
  .createServer(async (req, res) => {
    const path = req.url;
    if (req.method === 'GET' && path === '/logs') {
      console.log('getting logs');
      try {
        fs.readFile(FILENAME, 'utf8', (err, data) => {
          if (err) throw err;
          res.end(data);
        });
      } catch (e) {
        console.error(e);
        res.statusCode = 500;
        res.end('Server error 500');
      }
    } else if (req.method === 'GET') {
      try {
        res.statusCode = 200;
        res.end(state);
      } catch (e) {
        res.statusCode = 500;
        res.end(e.message);
      }
    } else if (req.method === 'PUT') {
      let body = '';

      req.on('data', (data) => {
        body += data;
      });

      req.on('end', async () => {
        let parsed;

        try {
          parsed = JSON.parse(body);
        } catch (e) {
          res.statusCode = 400;
          res.end('{"error":"CANNOT_PARSE"}');
        }
        const newState = await parsed.state;

        if (newState === state) {
          state = newState;
          res.end(JSON.stringify({ msg: 'State parameter is same as old' }));
        } else if (newState === 'INIT') {
          state = newState;
          writeToLogs(newState);
          res.end(JSON.stringify({ msg: 'State changed to INIT' }));
        } else if (newState === 'RUNNING') {
          state = newState;
          writeToLogs(newState);
          res.end(JSON.stringify({ msg: 'State changed to RUNNING' }));
        } else if (newState === 'PAUSED') {
          state = newState;
          writeToLogs(newState);
          res.end(JSON.stringify({ msg: 'State changed to PAUSED' }));
        } else if (newState === 'SHUTDOWN') {
          console.log(newState);
          state = newState;
          writeToLogs(newState);
          res.end(JSON.stringify({ msg: 'State changed to SHUTDOWN' }), () => {
            process.exit(1);
          });
        } else {
          res.end(JSON.stringify({ msg: 'State parameter not valid' }));
        }
      });
    } else {
      res.statusCode = 404;
      res.end();
    }
  })
  .listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
    writeToLogs('INIT');
  });

function writeToLogs(state) {
  const log = `${new Date().toISOString(Date.now())}: ${state}\n`;
  fs.appendFile(FILENAME, log, 'utf8', (err) => {
    if (err) throw err;
  });
}
