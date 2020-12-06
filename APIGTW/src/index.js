import http from 'http';
import fs from 'fs';
const PORT = 8081;
const FILENAME = '../../data/data.txt';
http
  .createServer(async (req, res) => {})
  .listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
