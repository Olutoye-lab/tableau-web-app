import { useState, useEffect, useRef, useCallback } from 'react';

interface SSEMessage {
  data: string;
}

interface UseSSEOptions {
  postUrl: string;
  sseBaseUrl: string; // Base URL for SSE, user_id will be appended
  payload?: any;
  headers?: Record<string, string>;
  autoConnect?: boolean;
}

export function useSSE(options: UseSSEOptions) {
  const { 
    postUrl,
    sseBaseUrl,
    payload,
    headers = {},
    autoConnect = false
  } = options;
  
  const [messages, setMessages] = useState<SSEMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const connect = useCallback(async (customPayload?: any) => {
    console.log("Collected")
    if (eventSourceRef.current) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const dataToSend = customPayload || payload;

      // STEP 1: POST request to get user_id
      abortControllerRef.current = new AbortController();
      
      const postResponse = await fetch(postUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      console.log("POSTED")

      if (!postResponse.ok) {
        throw new Error(`HTTP error! status: ${postResponse.status}`);
      }

      // STEP 2: Extract user_id from response
      const responseData = await postResponse.json();
      const receivedUserId = responseData.user_id;
      
      if (!receivedUserId) {
        throw new Error('No user_id provided in response');
      }

      setUserId(receivedUserId);
      console.log('Received user_id:', receivedUserId);

      // STEP 3: Build SSE URL using user_id as route parameter
      const sseUrl = `${sseBaseUrl}/${receivedUserId}`;
      console.log('Connecting to SSE at:', sseUrl);

      // STEP 4: Establish SSE connection with user_id route
      const eventSource = new EventSource(sseUrl);
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        setIsConnected(true);
        setIsLoading(false);
        console.log('SSE connection established for user:', receivedUserId);
      };

      eventSource.addEventListener('normal', (event) => {
        console.log('Normal event:', event.data);
        const newMessage: SSEMessage = {
          data: event.data,
        };
        setMessages((prev) => [...prev, newMessage]);
      });

      eventSource.addEventListener('start', (event) => {
        console.log('Start event:', event.data);
        const newMessage: SSEMessage = {
          data: event.data,
        };
        setMessages((prev) => [...prev, newMessage]);
      });

      eventSource.addEventListener('end', (event) => {
        console.log('end event:', event.data);
        const newMessage: SSEMessage = {
          data: event.data,
        };
        setMessages((prev) => [...prev, newMessage]);
      });

      eventSource.addEventListener('connect', (event) => {
        console.log('connect event:', event);
      });

      eventSource.addEventListener('error', (event) => {
        console.log('Error event:', event);
      });

      eventSource.onerror = (err) => {
        console.error('SSE error:', err);
        setError('Connection error occurred');
        setIsConnected(false);
        setIsLoading(false);
        disconnect();
      };

    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(`Failed to connect: ${err.message}`);
        setIsConnected(false);
        setIsLoading(false);
      }
    }
  }, [postUrl, sseBaseUrl, payload, headers]);

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsConnected(false);
    setIsLoading(false);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  useEffect(() => {
    if (autoConnect) {
      connect();
    }
    return () => {
      disconnect();
    };
  }, []);

  return {
    messages,
    isConnected,
    isLoading,
    error,
    userId,
    connect,
    disconnect,
    clearMessages,
  };
}