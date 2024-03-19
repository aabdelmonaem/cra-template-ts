import axios from 'axios';
import { authHeader } from '@aabdelmonaem/core-lib'; // Assuming the type exists



const API_URL = process.env.REACT_APP_API_KEY + "/config/";

const getAllConfig = async (): Promise<any[]> => { // Updated return type
  const headers = authHeader(); // Assuming authHeader returns an object
  const response = await axios.get(API_URL, { headers });
  return response.data ;
};

const ConfigService = {
  getAllConfig,
};

export default ConfigService;