import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';
import Meal from '../models/Meal.js';
import Progress from '../models/Progress.js';

let token = '';
let workoutId = '';
let mealId = '';
let progressId = '';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST || process.env.MONGO_URI);
  await User.deleteMany({});
  await Workout.deleteMany({});
  await Meal.deleteMany({});
  await Progress.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Full App Integration Test', () => {
  it('registers a user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Integration User',
      email: 'int@test.com',
      password: '123456'
    });
    expect(res.statusCode).toBe(201);
  });

  it('logs in the user', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'int@test.com',
      password: '123456'
    });
    token = res.body.token;
    expect(token).toBeDefined();
  });

  it('creates a workout', async () => {
    const res = await request(app)
      .post('/api/workouts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        category: 'strength',
        exercises: [{ name: 'Bench Press', sets: 3, reps: 10, weight: 80 }]
      });
    workoutId = res.body._id;
    expect(res.statusCode).toBe(201);
  });

  it('creates a meal', async () => {
    const res = await request(app)
      .post('/api/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        mealType: 'lunch',
        foodItems: [{ name: 'Chicken Breast', quantity: '200g', calories: 300 }]
      });
    mealId = res.body._id;
    expect(res.statusCode).toBe(201);
  });

  it('creates a progress log', async () => {
    const res = await request(app)
      .post('/api/progress')
      .set('Authorization', `Bearer ${token}`)
      .send({
        weight: 80,
        bodyFat: 15,
        waist: 32,
        chest: 38,
        performance: '5km run in 30 min'
      });
    progressId = res.body._id;
    expect(res.statusCode).toBe(201);
  });

  it('fetches dashboard summary', async () => {
    const res = await request(app)
      .get('/api/dashboard')
      .set('Authorization', `Bearer ${token}`);
    expect(res.body.workouts.length).toBeGreaterThan(0);
    expect(res.body.meals.length).toBeGreaterThan(0);
    expect(res.body.progressLogs.length).toBeGreaterThan(0);
    expect(res.body.totalCaloriesToday).toBeGreaterThan(0);
  });

  it('cleans up created data', async () => {
    await request(app).delete(`/api/workouts/${workoutId}`).set('Authorization', `Bearer ${token}`);
    await request(app).delete(`/api/meals/${mealId}`).set('Authorization', `Bearer ${token}`);
    await request(app).delete(`/api/progress/${progressId}`).set('Authorization', `Bearer ${token}`);
  });
});
