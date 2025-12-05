import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your CampusEventHub assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    if (message.includes('register') || message.includes('sign up')) {
      return "To register for an event: 1. Log in to your account 2. Browse events 3. Click 'Register' on the event you want 4. Fill in the registration form 5. Complete payment if required";
    }

    if (message.includes('login') || message.includes('sign in')) {
      return "To log in: 1. Click the 'Login' button 2. Enter your email and password 3. Click 'Sign In' 4. If you forgot your password, use 'Forgot Password'";
    }

    if (message.includes('create event') || message.includes('organize')) {
      return "To create an event: 1. Log in as a college admin 2. Go to 'Create Event' 3. Fill in event details 4. Set date, time, and capacity 5. Submit for approval";
    }

    if (message.includes('payment') || message.includes('pay')) {
      return "Payment is handled securely through Stripe. You'll be redirected to a secure payment page when registering for paid events.";
    }

    if (message.includes('ticket') || message.includes('download')) {
      return "After successful registration, you can download your ticket from your dashboard under 'My Registrations'.";
    }

    if (message.includes('feedback') || message.includes('review')) {
      return "You can leave feedback for events you've attended. Go to the event page and click 'Leave Feedback'.";
    }

    if (message.includes('admin') || message.includes('manage')) {
      return "College admins can manage events, approve registrations, and view analytics. Super admins have additional privileges.";
    }

    if (message.includes('help') || message.includes('support')) {
      return "I'm here to help! You can ask me about registration, login, creating events, payments, tickets, feedback, or admin features.";
    }

    return "I'm sorry, I didn't understand that. Please try asking about registration, login, events, payments, or other features.";
  };

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages(prev => [...prev, userMessage]);

      const botResponse = getBotResponse(input);
      setTimeout(() => {
        setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      }, 500);

      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Chatbot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-colors z-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">CampusEventHub Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-3 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block p-2 rounded-lg max-w-xs ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;