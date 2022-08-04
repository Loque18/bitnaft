import { useState, useEffect } from 'react';
import api from 'src/api';

const useFetch = (type, resourceMethod, options) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [response, setRespose] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await api[type][resourceMethod](options);

                if (res.data.success) {
                    setSuccess(true);
                    setRespose(res);
                } else {
                    throw new Error(res.data.message);
                }
            } catch (err) {
                setError(err);
                setFailure(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { loading, success, failure, response, error };
};

export default useFetch;
