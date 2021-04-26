import axios from 'axios';
import { Auth } from 'aws-amplify';

const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://h7b80ajhe4.execute-api.eu-west-1.amazonaws.com/prod' 
  : 'https://8aauiio3p1.execute-api.eu-west-1.amazonaws.com/dev';

type ApiResponse<T> = {
  success: true,
  data: T
} | {
  success: false,
  error: string
};

export let cancelToken = axios.CancelToken.source();

export const awsGet = async <T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> => {
  try {
    const session = await Auth.currentSession();
    const auth = session.getIdToken().getJwtToken();
    
    cancelToken = axios.CancelToken.source();
    
    const res = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': auth
      },
      params,
      cancelToken: cancelToken.token
    });

    return { success: true, data: res.data as T };
  } catch (e) {
    return {
      success: false,
      error: e.response?.data?.error || e.toString()
    };
  }
};

export const awsDelete = async <T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> => {
  try {
    const session = await Auth.currentSession();
    const auth = session.getIdToken().getJwtToken();

    const res = await axios.delete(`${BASE_URL}${endpoint}`, {
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