import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// Class Middleware
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('I am a local middleware.');
    console.log('Request...');
    next();
  }
}

// Functional Middleware
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('I am a Global Middleware.');
  console.log('Request...');
  next();
}
