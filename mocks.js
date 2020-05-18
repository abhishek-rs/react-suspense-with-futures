import { setupWorker, rest } from 'msw';
import mockResponse from './mocks/mockApiResponse';

const worker = setupWorker(
  rest.get('https://test.com/api', (req, res, ctx) => {
    return res(
      ctx.delay(1500),
      ctx.status(202, 'Mocked status'),
      ctx.json({
        response: mockResponse,
      })
    );
  })
);

worker.start();
