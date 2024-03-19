import { User } from '@aabdelmonaem/core-lib/lib/esm/useAuth/types';
import axios from 'axios';


// // Type for response data structure (replace with actual API response structure)
// interface AuthResponseData {
//    user: User | null,
//   // ... relevant properties from your API response
// }

const API_URL = process.env.REACT_APP_API_KEY + "/api/auth/";

const signin = async (username: string, password: string): Promise<User> => {
  const response = await axios.post(API_URL + "signin", {
    username,
    password,
  });
  return response.data;
};

const signout = () => {
  console.log('signout');
};

const getCurrentUser = (): User | null => {
  const userString = localStorage.getItem("user");
  if (!userString) {
    return null;
  }
  try {
    return JSON.parse(userString) as User;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

const AuthService = {
  signin,
  signout,
  getCurrentUser,
};

export default AuthService;