import React, { useState } from 'react';
import axios from 'axios';

const VoiceInput = ({ userId, onTranscribe }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [message, setMessage] = useState('');

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      setMessage(result);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    setIsListening(true);
    recognition.start();
  };

  const handleSend = async () => {
    if (!userId || !message) {
      alert("User ID or message is missing.");
      console.log("userId:", userId);
      console.log("message:", message);
      return;
    }
    console.log("userId:", userId);
    console.log("message:", message);

    try {
      const response = await axios.get(`http://localhost:8101/api/schedules/create-schedule`, {
        params: {
          userId,
          message,
        },
      });

      if (response.status === 200) {
        alert("Schedule added successfully!");
      }
    } catch (error) {
      console.error("Error sending schedule:", error);
      alert("Failed to add schedule");
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={startListening}
        className={`py-3 px-6 mb-2 rounded-lg shadow-md transition duration-300 ${
          isListening ? "bg-purple-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isListening ? "Listening..." : "Start Voice Input"}
      </button>

      <textarea
        data-gramm="false"
        className="mt-4 w-full p-3 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Edit or type your message here"
      />

      <button
        onClick={handleSend}
        className="mt-4 py-3 px-6 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition duration-300"
      >
        Send
      </button>
    </div>
  );
};

export default VoiceInput;
