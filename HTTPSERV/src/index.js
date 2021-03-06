/* 
This service is responsible for serving message logs.
*/

import http from "http";
import fs from "fs";
const PORT = 8082;
const FILENAME = "../../data/data.txt";
http
  .createServer(async (req, res) => {
    try {
      fs.readFile(FILENAME, "utf8", (err, data) => {
        res.end(data);
      });
    } catch (e) {
      console.error(e);
      res.statusCode = 500;
      res.end("Server error 500");
    }
  })
  .listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
