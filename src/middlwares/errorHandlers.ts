import type { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/responses.js';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  return errorResponse(res, err, err.statusCode || 500, err.message || 'Internal Server Error');
}