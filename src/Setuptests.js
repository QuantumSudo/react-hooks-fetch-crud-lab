// src/setupTests.js
import { server } from './mocks/server'; // Correct import of the server

beforeAll(() => server.listen()); // Start the server before tests
afterEach(() => server.resetHandlers()); // Reset handlers between tests
afterAll(() => server.close()); // Close the server after all tests
