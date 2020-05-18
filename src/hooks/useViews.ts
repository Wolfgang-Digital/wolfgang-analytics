import { useEffect, useState } from 'react';
import axios from 'axios';

export const useViews = () => {
  //const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios('https://1si784c8o0.execute-api.eu-west-1.amazonaws.com/dev/views', {
        method: 'POST'
      });
      console.log(res);
    };
    fetchData();
  }, []);
};