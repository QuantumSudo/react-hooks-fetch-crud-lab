// src/mocks/server.js
import { setupServer } from 'msw/node';
import { handlers } from './handlers'; // This should be correctly importing from the `handlers.js`

export const server = setupServer(...handlers);
