const fetch = require('node-fetch');
const timeout = 10000;
describe('Test HTTP server', () => {
  it('Test that response status is 200', async () => {
    const response = await fetch(`http://httpserv:8082`);
    expect(response.status).toBe(200);
  });
});

describe('Test API Gateway', () => {
  it('Test that response status is 200', async () => {
    const response = await fetch(`http://apigateway:8081/messages`);
    expect(response.status).toBe(200);
  });
});
