import {connect} from 'mongoose';


export const connectToDatabase = async () => {
  try{
    await connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/UrlShorteningService');
    console.log('Connected to MongoDB');
  }catch(error){
    console.error('Error connecting to database:', error);
    process.exit(1); // Exit the process with an error code
  }
}