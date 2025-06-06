import { useState, useCallback } from 'react'

export const useHttp = () => { 
        const [process, setProcess] = useState('waiting');

    const request = useCallback(async (url, method = 'GET', body = null) => { 
                
        setProcess('loading')          
        try {
            const response = await fetch(url, { method, body});

            if (!response.ok) {
                throw new Error(`Coud not fetch ${url}, status: ${response.status}`);
            }
            
            const data = await response.json();

            return data

        } catch (e) { 
        
            setProcess('error')
            throw e;
        }

    }, [])

    const clearError = useCallback(() => {
        
        setProcess('loading')
    }, [])
    
    return {request, clearError, process, setProcess}
}