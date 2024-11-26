import { Request, Response } from 'express';

declare global {
  namespace Express {
    interface Request {
      payload: {
        timestamp?: string | Date;
        mid?: string;
        response?: object;
      };
    }
  }
}

export {};
