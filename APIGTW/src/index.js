import http from 'http';
import fetch from 'node-fetch';
const PORT = 8081;

http
  .createServer(async (req, res) => {
    const path = req.url;
    if (req.method === 'GET' && path === '/messages') {
      try {
        const response = await fetch(`http://httpserv:8082`);
        res.end(await response.text());
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
