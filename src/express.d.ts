import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user?:object,
    mid?:string, // manaya harus unique
    timestamp?: string | Date,
    response?: object // manaya harus unique
  }
}

export {};
