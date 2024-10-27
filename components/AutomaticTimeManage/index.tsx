import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const AutomaticTimeManage = () => {
  const [parsedSummary, setParsedSummary] = useState(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [weeklyScore, setWeeklyScore] = useState(null); // 更新为null以确保有动态效果
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

      // 更新状态
      setParsedSummary({
        summary: response.data.summary,
        achievements: response.data.achievements,
        recommendations: response.data.recommendations
      });
      setWeeklyScore(response.data.score); // 设置得分
    } catch (error) {
      console.error('Error fetching summary:', error);
      setMessage('Failed to fetch summary.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 mt-6">
      {/* Voice Input */}
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Voice Input</h2>
        <p className="text-gray-600 text-sm mb-4">Use your voice to input tasks quickly and easily.</p>
        <button className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition">
          Start Voice Input
        </button>
      </div>

      {/* Schedule */}
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Schedule</h2>
        <p className="text-gray-600 text-sm mb-4">View and manage your daily tasks and events.</p>
        <button className="w-full py-3 text-lg font-semibold text-white bg-green-500 rounded hover:bg-green-600 transition">
          View Schedule
        </button>
      </div>

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
