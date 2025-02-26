const request = require('supertest');
const app = require('../server'); // Assurez-vous que votre fichier server.js exporte l'application Express
const mongoose = require('mongoose');
const Student = require('../models/studentModel');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  await Student.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Student API', () => {
  it('should get all students', async () => {
    const res = await request(app).get('/api/students');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('students');
  });

  it('should create a new student', async () => {
    const res = await request(app)
      .post('/api/students')
      .send({
        name: 'Test Student',
        age: 20,
        email: `test${Date.now()}@student.com`,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('student');
  });

  it('should update a student', async () => {
    const student = new Student({
      name: 'Test Student',
      age: 20,
      email: `test${Date.now()}@student.com`,
    });
    await student.save();

    const res = await request(app)
      .put(`/api/students/${student._id}`)
      .send({
        name: 'Updated Student',
        age: 21,
        email: `updated${Date.now()}@student.com`,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Updated Student');
  });

  it('should delete a student', async () => {
    const student = new Student({
      name: 'Test Student',
      age: 20,
      email: `test${Date.now()}@student.com`,
    });
    await student.save();

    const res = await request(app).delete(`/api/students/${student._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Étudiant supprimé avec succès');
  });
});
