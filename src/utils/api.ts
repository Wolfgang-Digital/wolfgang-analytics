import axios from 'axios';

const BASE_URL = 'https://1si784c8o0.execute-api.eu-west-1.amazonaws.com/prod';

export const awsGet = async <T>(endpoint: string, params: Record<string, any>) => {
  try {
    const res = await axios.get(`${BASE_URL}${endpoint}`, { params });
    return { success: true, data: res.data as T };
  } catch (e) {
    return {
      success: false,
      error: e.response?.data?.error || e.toString()
    };
  }
};