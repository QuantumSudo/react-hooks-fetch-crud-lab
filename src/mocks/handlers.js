// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:4000/questions', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          prompt: 'lorem testum 1',
          answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
          correctIndex: 0,
        },
        {
          id: 2,
          prompt: 'lorem testum 2',
          answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
          correctIndex: 1,
        },
      ])
    );
  }),

  rest.post('http://localhost:4000/questions', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        id: 3,
        prompt: 'Test Prompt',
        answers: ['Test Answer 1', 'Test Answer 2', 'Test Answer 3', 'Test Answer 4'],
        correctIndex: 1,
      })
    );
  }),

  rest.delete('http://localhost:4000/questions/:id', (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.patch('http://localhost:4000/questions/:id', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: req.params.id,
        prompt: 'Updated Prompt',
        answers: ['Updated Answer 1', 'Updated Answer 2', 'Updated Answer 3', 'Updated Answer 4'],
        correctIndex: 1,
      })
    );
  }),
];
