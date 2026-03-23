import express from 'express';
import { createShortUrl } from '../../controllers/v1/urlServices.controllers.js';

const router = express.Router();

// Define your routes here
router.get('/', createShortUrl);

export default router;