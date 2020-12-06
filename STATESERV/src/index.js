import http from 'http';
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
    } else {
      res.end();
    }
  })
  .listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
