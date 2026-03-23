import type {Response} from 'express';


const successResponse = (res: Response, data: any, statusCode : number= 200, message: string = 'Success') => {
  res.status(statusCode).json({ success: true, message, data });
};


const errorResponse = (res: Response, error: any, statusCode : number= 500, message: string = 'Error') => {
  res.status(statusCode).json({ success: false,  message, error });
};

export { successResponse, errorResponse };