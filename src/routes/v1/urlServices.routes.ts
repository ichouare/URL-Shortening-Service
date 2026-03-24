  import express from 'express';
  import { createShortUrl, deleteUrl, getUrlStats, redirectToOriginalUrl, updateUrl } from '../../controllers/v1/urlServices.controllers.js';
  import { validateRequest } from '../../middlwares/validate.js';
  import { createShortUrlSchema } from '../../validators/urlServices.schemas.js';

  const router = express.Router();

  // Define your routes here
  router.post('/shorten', validateRequest(createShortUrlSchema),  createShortUrl);
  router.get('/:id', redirectToOriginalUrl);
  router.put('/shorten/:id', validateRequest(createShortUrlSchema),  updateUrl);
  router.delete('/shorten/:id', deleteUrl);
    router.get('/shorten/:id/stats', getUrlStats);

  export default router;