/* 
This service serves clients outside the service network and forwards requests.
*/

import http from 'http';
import fetch from 'node-fetch';
const PORT = 8081;

http
  .createServer(async (req, res) => {
    const path = req.url;
    res.setHeader('Content-Type', 'application/json');
    if (req.method === 'GET' && path === '/messages') {
      try {
        const response = await fetch(`http://httpserv:8082`);
        res.end(await response.text());
      } catch (e) {
        res.statusCode = 500;
        res.end(e.message);
      }
    } else if (req.method === 'GET' && path === '/run-log') {
      console.log('gatewat get logs');
      try {
        const response = await fetch('http://stateserv:9000/logs');
        const data = await response.text();
        res.end(data);
      } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.end(e);
      }
    } else if (req.method === 'GET' && path === '/state') {
      try {
        const response = await fetch(`http://stateserv:9000`);
        res.end(await response.text());
      } catch (e) {
        res.end(e.message);
      }
    } else if (req.method === 'PUT' && path === '/state') {
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
        const response = await fetch(`http://stateserv:9000/state`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(parsed),
        });

        if (response.status === 200) {
          res.end(await response.text());
        } else {
          res.end('Something went wrong');
        }
      });
    } else {
      res.statusCode = 404;
      res.end();
    }
  })
  .listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
