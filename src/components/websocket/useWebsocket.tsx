import { useEffect, useState } from 'react';

export const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    // Create WebSocket connection
    const webSocket = new WebSocket(url);
    
    // On open connection
    webSocket.onopen = () => {
      console.log('WebSocket connected');
    };
    
    // On receiving a message from the server
    webSocket.onmessage = (event) => {
      setMessage(event.data);
    };
    
    // On error
    webSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    // On connection close
    webSocket.onclose = () => {
      console.log('WebSocket disconnected');
    };
    
    setSocket(webSocket);
    
    // Cleanup on component unmount
    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, [url]);

  // Send message via WebSocket
  const sendMessage = (data: any) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data));
    } else {
      console.error('WebSocket is not open');
    }
  };

  return { sendMessage, message };
};
