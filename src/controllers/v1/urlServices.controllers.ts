import { errorResponse, successResponse } from "../../utils/responses.js";
import type {Request, Response} from 'express';
import type { TCreateShortUrl } from "../../validators/urlServices.schemas.js";
import { nanoid } from 'nanoid'
import { Url } from "../../models/url.js";
import { initlializeRedisClient } from "../../utils/redisClient.js";

export  async function createShortUrl(req: Request, res: Response) {

  // Logic to create a short URL
  try{
    const { url } = req.body as TCreateShortUrl;

  const shortCode = nanoid(6);// Generate a unique short code
  const short_url = `${process.env.DOMAINE_NAME}/${shortCode}`;

  // Here you would typically save the mapping of shortCode to url in your database
  const dummydata = {
    id: 1,
    originalUrl: url,
    shortUrl: short_url,
    createdAt: new Date(),
    updateAt: new Date(),
  }

  const newUrl = await Url.create(dummydata)

  return successResponse(res, { shortUrl: short_url }, 201, "Short URL created successfully");
}
catch(err)
{
   return errorResponse(res, "An error occurred while retrieving URL statistics", 500);
}
}



export async function redirectToOriginalUrl(req: Request, res: Response) {
  try{
    const { id } = req.params;


    const client = await initlializeRedisClient()
  console.log("here");
  const urlEntry = await Url.findOne({ shortUrl:  `${process.env.DOMAINE_NAME}/${id}` }).lean();

  if (!urlEntry?.originalUrl) {
    return errorResponse(res, "Short URL not found", 404);
  }

  await Url.findByIdAndUpdate(urlEntry._id, { $inc: { clickCount: 1 }, updateAt: new Date() });
  return res.status(301).redirect(urlEntry.originalUrl);
}catch(err)
{
   return errorResponse(res, "An error occurred while retrieving URL statistics", 500);
}

}




export async function updateUrl(req: Request, res: Response) {
  try{
    const { id } = req.params;
  const { url } = req.body as TCreateShortUrl;

  const existUrl = await Url.findOneAndUpdate(
    {
      shortUrl: `${process.env.DOMAINE_NAME}/${id}`
  },
  {
    originalUrl: url,
    updateAt: new Date(),
    clickCount: 0
  },
  {
    new: true
  }
  ).lean();

  if (!existUrl) {
    return errorResponse(res, "Short URL not found", 404);
  }
  return successResponse(res, { shortUrl: existUrl.shortUrl }, 200, "Short URL updated successfully");
}catch(err)
{
   return errorResponse(res, "An error occurred while retrieving URL statistics", 500);
}
}



export async function deleteUrl(req: Request, res: Response) {



  try{

    const { id } = req.params;

    const existUrl = await Url.findOneAndDelete(
      {
        shortUrl: `${process.env.DOMAINE_NAME}/${id}`
      },
      {
        new: true
      }
    ).lean();
    if (!existUrl) {
      return errorResponse(res, "Short URL not found", 404);
    }
    return successResponse(res, { shortUrl: existUrl.shortUrl }, 200, "Short URL deleted successfully");
  }catch(error)
  {
       return errorResponse(res, "An error occurred while retrieving URL statistics", 500);
  }
  }



export async function getUrlStats(req: Request, res: Response) {


  try{

    console.log(req.ip)
    const {id} = req.params;
  const urlEntry = await Url.findOne({ shortUrl:  `${process.env.DOMAINE_NAME}/${id}` }).lean();

  if (!urlEntry) {
    return errorResponse(res, "Short URL not found", 404);
  }

  const stats = {
    originalUrl: urlEntry.originalUrl,
    shortUrl: urlEntry.shortUrl,
    clickCount: urlEntry.clickCount,
    createdAt: urlEntry.createdAt,
    updateAt: urlEntry.updateAt
  };

  return successResponse(res, stats, 200, "URL statistics retrieved successfully");
  }catch(error){
    console.error('Error retrieving URL statistics:', error);
    return errorResponse(res, "An error occurred while retrieving URL statistics", 500);
  }
}