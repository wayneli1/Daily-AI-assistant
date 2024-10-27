import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import VoiceInput from '@/components/VoiceInput'; // 导入 VoiceInput 组件

const AutomaticTimeManage = () => {
  const [parsedSummary, setParsedSummary] = useState(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [weeklyScore, setWeeklyScore] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem('id');
    if (!storedUserId) {
      setMessage('User is not logged in.');
      router.push('/login');
    } else {
      setUserId(storedUserId);
    }
  }, [router]);

  const fetchDailySummary = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem('id');
      const response = await axios.get(`http://localhost:8101/api/schedules/summary`, {
        params: { userId }
      });

      setParsedSummary({
        summary: response.data.summary,
        achievements: response.data.achievements,
        recommendations: response.data.recommendations
      });
      setWeeklyScore(response.data.score); 
    } catch (error) {
      console.error('Error fetching summary:', error);
      setMessage('Failed to fetch summary.');
    } finally {
      setLoading(false);
    }
  };

  const handleTranscribe = async (text) => {
    try {
      if (userId) {
        const response = await axios.post(`http://localhost:8101/api/schedules/setSchedule`, {
          userId,
          message: text
        });
        setMessage('Schedule created successfully!');
      } else {
        setMessage('User ID not found.');
      }
    } catch (error) {
      console.error('Error creating schedule:', error);
      setMessage('Failed to create schedule.');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 mt-6">
      {/* Voice Input */}
      {userId && <VoiceInput userId={userId} onTranscribe={handleTranscribe} />}

      {/* Personalized Summary Report */}
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Personalized Summary Report</h2>
        <p className="text-gray-600 text-sm mb-4">Get a daily summary and insights to optimize your time.</p>
        <button
          onClick={fetchDailySummary}
          className="w-full py-3 text-lg font-semibold text-white bg-indigo-500 rounded hover:bg-indigo-600 transition"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Generate Summary'}
        </button>
        {message && <p className="text-red-500 mt-2">{message}</p>}

        {/* Display the parsed summary information */}
        {parsedSummary && (
          <div className="mt-4 bg-indigo-50 p-4 rounded-md border border-indigo-200 text-gray-800">
            <h3 className="text-xl font-semibold text-indigo-700">Today's Summary</h3>
            <p><strong>Summary:</strong> {parsedSummary.summary}</p>
            <p className="mt-2"><strong>Achievements:</strong> {parsedSummary.achievements}</p>
            <p className="mt-2"><strong>Recommendations:</strong> {parsedSummary.recommendations}</p>
          </div>
        )}
      </div>

      {/* Weekly Score */}
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Weekly Score</h2>
        <p className="text-gray-600 text-sm mb-4">Track your performance and ensure a balanced week.</p>
        <div className="text-5xl font-bold text-purple-600">{weeklyScore ?? '?'}</div>
      </div>
    </div>
  );
};

export default AutomaticTimeManage;
