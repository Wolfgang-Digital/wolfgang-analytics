import { useAwsGet } from 'hooks/aws';

export const useDashboard = () => {
  const res = useAwsGet<any>('/pipeline/report');
  return res;
}