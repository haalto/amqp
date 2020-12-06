const fetch = require('node-fetch');

describe('Test HTTP server', () => {
  it('Test that response status is 200', async () => {
    const response = await fetch(`http://httpserv:8081`);
    expect(response.status).toBe(200);
  });
});
