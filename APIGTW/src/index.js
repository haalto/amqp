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

      req.on('end', () => {
        let parsed;

        try {
          parsed = JSON.parse(body);
        } catch (e) {
          res.statusCode = 400;
          res.end('{"error":"CANNOT_PARSE"}');
        }

        res.end(
          JSON.stringify({
            parsed,
          })
        );
      });
    } else {
      res.statusCode = 400;
      res.end();
    }
  })
  .listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
