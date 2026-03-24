import express from 'express';

const PORT = process.env.PORT
const app = express();



//routes
import urlServices from './routes/v1/urlServices.routes.js';
import { errorHandler } from './middlwares/errorHandlers.js';
import { connectToDatabase } from './config/mongoose.js';



//middlwares
app.use(express.json())

app.use(errorHandler)





//use routes]

app.use('/', urlServices)

app.get('/', (req, res) => {
  res.send('Hello World!');
});


//connect to database

connectToDatabase()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Error starting server:', err);
});