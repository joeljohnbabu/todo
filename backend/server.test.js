const request = require('supertest');
const app = require('./server');

describe('Todo API Endpoints', () => {
  it('should fetch all todos', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ text: 'Test new todo' });
    expect(res.statusCode).toEqual(201);
    expect(res.body.text).toEqual('Test new todo');
    expect(res.body.completed).toEqual(false);
  });

  it('should toggle a todo status', async () => {
    const res = await request(app)
      .put('/api/todos/1')
      .send({ completed: false });
    expect(res.statusCode).toEqual(200);
    expect(res.body.completed).toEqual(false);
  });

  it('should delete a todo', async () => {
    const res = await request(app).delete('/api/todos/1');
    expect(res.statusCode).toEqual(204);
  });
});
