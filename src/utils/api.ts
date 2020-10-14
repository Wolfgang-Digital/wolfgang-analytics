import axios from 'axios';
import { Auth } from 'aws-amplify';

const BASE_URL = 'https://1si784c8o0.execute-api.eu-west-1.amazonaws.com/dev';

type ApiResponse<T> = {
  success: true,
  data: T
} | {
  success: false,
  error: string
};

export const awsGet = async <T>(endpoint: string, params: Record<string, any>): Promise<ApiResponse<T>> => {
  try {
    const session = await Auth.currentSession();
    const auth = session.getIdToken().getJwtToken();

    const res = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': auth
      },
      params
    });

    return { success: true, data: res.data as T };
  } catch (e) {
    return {
      success: false,
      error: e.response?.data?.error || e.toString()
    };
  }
};

export const awsPost = async <T>(endpoint: string, body: Record<string, any>): Promise<ApiResponse<T>> => {
  try {
    const session = await Auth.currentSession();
    const auth = session.getIdToken().getJwtToken();

    const res = await axios.post(`${BASE_URL}${endpoint}`, body, {
      headers: {
        'Authorization': auth
      }
    });

    return { success: true, data: res.data as T };
  } catch (e) {
    return {
      success: false,
      error: e.response?.data?.error || e.toString()
    };
  }
};