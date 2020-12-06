const fetch = require('node-fetch');
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

  it('Responses with status code 200 when sending PUT request with payload', async () => {
    const response = await fetch(`http://apigateway:8081/state`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ state: 'INIT' }),
    });

    expect(response.status).toBe(200);
  });

  it('Responses with status code 200 when sending PUT request with payload', async () => {
    const response = await fetch(`http://apigateway:8081/state`);
    expect(response.status).toBe(200);
  });

  it('Returned state should be INIT', async () => {
    const response = await fetch(`http://apigateway:8081/state`);
    const data = await response.text();
    expect(data).toBe('INIT');
  });

  it('Change state from INIT to PAUSED', async () => {
    await fetch(`http://apigateway:8081/state`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ state: 'PAUSED' }),
    });
    const response = await fetch(`http://apigateway:8081/state`);
    const data = await response.text();
    expect(data).toBe('PAUSED');
  });

  it('If parameter is not valid state does is not changed', async () => {
    await fetch(`http://apigateway:8081/state`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ state: 'WOLOLO' }),
    });
    const response = await fetch(`http://apigateway:8081/state`);
    const data = await response.text();
    expect(data).not.toBe('WOLOLO');
  });

  it('Requesting logs returns status code 200', () => {
    const response = await fetch('http://apigateway:8081/run-log');
    expect(response.status).toBe(200);
  })
});
