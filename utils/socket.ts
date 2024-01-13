import { io } from 'socket.io-client';

const URL = process.env.BE_URL||'http://localhost:2601';

export const socket = io(URL);