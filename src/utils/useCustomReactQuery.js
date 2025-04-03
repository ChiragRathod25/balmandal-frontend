import { useEffect, useState } from 'react';

function useCustomReactQuery(apiCall) {
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  
  const fetchData = async () => {
    
    try {
      setLoading(true);
      setError('');
      const response = await apiCall();
      setData(response.data);
    } catch (error) {
      setError(error.message);
    } finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [apiCall]);
  return {
    error,
    data,
    loading,
    refetch: ()=>fetchData(),
  };
}

export default useCustomReactQuery;
