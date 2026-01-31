import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import API_BASE_URL from '../config/api';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        headers: {
          'Authorization': `Bearer ${userInfo.token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      toast.error('Error fetching messages');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/${messageId}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${userInfo.token}`
        }
      });

      if (response.ok) {
        setMessages(messages.map(msg => 
          msg._id === messageId ? { ...msg, isRead: true } : msg
        ));
        toast.success('Message marked as read');
      }
    } catch (error) {
      toast.error('Error updating message');
    }
  };

  if (loading) return <div className="text-center py-20"><h2>Loading Messages...</h2></div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Messages</h1>
      
      {messages.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-xl text-gray-600">No messages yet</h3>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message._id} 
              className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                message.isRead ? 'border-gray-300' : 'border-blue-500'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{message.subject}</h3>
                  <p className="text-sm text-gray-600">
                    From: {message.name} ({message.email})
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(message.createdAt).toLocaleDateString()} at{' '}
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {!message.isRead && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      New
                    </span>
                  )}
                  {!message.isRead && (
                    <button
                      onClick={() => markAsRead(message._id)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;