import http from 'http';
import { parse } from 'querystring';
const PORT = 9000;
let state = 'INIT';
http
  .createServer(async (req, res) => {
    if (req.method === 'GET') {
      try {
        res.statusCode = 200;
        res.end(state);
      } catch (e) {
        res.statusCode = 500;
        res.end(e.message);
      }
    } else if (req.method === 'PUT') {
      try {
        let body;
        req.on('data', (chunk) => {
          body += chunk.toString();
        });
        const parsedBody = parse(body);
        console.log(parsedBody);
        req.end(parsedBody);
      } catch (e) {
        res.statusCode = 500;
        res.end(e.message);
      }
    } else {
      res.end();
    }
  })
  .listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
