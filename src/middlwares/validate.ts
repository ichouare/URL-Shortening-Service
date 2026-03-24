import type { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/responses.js';
import type { ZodSchema } from "zod";


export const  validateRequest = (<T>(schema: ZodSchema<T>) =>  {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationResult = schema.safeParse(req.body);
    if (!validationResult.success) {
      return errorResponse(res, validationResult.error.message, 400, 'Validation Error');
    }
    // Attach the validated data to the request object for further use
    req.body = validationResult.data;
    next();
  };
});
