import { io } from 'socket.io-client';

const URL = process.env.URL||'http://localhost:3001';

export const socket = io(URL);