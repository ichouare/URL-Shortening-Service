import { successResponse } from "../../utils/responses.js";
import type {Request, Response} from 'express';

export function createShortUrl(req: Request, res: Response) {
  // Logic to create a short URL
  return successResponse(res, { shortUrl: "http://short.url/abc123" }, 201, "Short URL created successfully");
}