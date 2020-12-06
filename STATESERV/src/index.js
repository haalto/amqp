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
    } else if (req.method === 'PUT') {
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
        const newState = parsed.state;

        if (newState === state) {
          state = newState;
          res.end(JSON.stringify({ msg: 'State parameter is same as old' }));
        } else if (newState === 'INIT') {
          state = newState;
          res.end(JSON.stringify({ msg: 'State changed' }));
        } else if (newState === 'RUNNING') {
          state = newState;
          res.end(JSON.stringify({ msg: 'State changed' }));
        } else if (newState === 'PAUSED') {
          state = newState;
          res.end(JSON.stringify({ msg: 'State changed' }));
        } else if (newState === 'SHUTDOWN') {
          state = newState;
          res.end(JSON.stringify({ msg: 'State changed' }));
        } else {
          res.end(JSON.stringify({ msg: 'State parameter not valid' }));
        }
      });
    } else {
      res.end();
    }
  })
  .listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
