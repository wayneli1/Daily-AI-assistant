import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '@/components/SideBar'; // Sidebar 组件
import ShowUser from '@/components/ShowUser'; // ShowUser 组件

const RecommendMood = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [mood, setMood] = useState(''); // 用户输入的心情
    const [report, setReport] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // 新增loading状态
    const router = useRouter();

    // 表情符号选项（emoji 表情）
    const emojis = [
        { label: '😢', value: 'sad' },
        { label: '😄', value: 'happy' },
        { label: '😠', value: 'angry' },
        { label: '😈', value: 'devil' },
        { label: '🤡', value: 'joker' },
        { label: '🤯', value: 'overload' },
        { label: '🥺', value: 'poor' },
    ];

    // 在页面加载时获取用户的ID
    useEffect(() => {
        const storedUserId = localStorage.getItem('id'); // 获取用户ID
        if (!storedUserId) {
            setMessage('User is not logged in.');
            router.push('/login'); // 如果未登录，跳转到登录页面
        } else {
            setUserId(storedUserId);
        }
    }, [router]);

    // 点击表情符号设置心情
    const handleEmojiClick = (emoji: string) => {
        setMood(emoji);
    };

    // 处理提交请求
    const handleGenerateRecommendation = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userId) {
            setMessage('User ID not found.');
            return;
        }

        if (!mood) {
            setMessage('Please enter or select your mood.');
            return;
        }

        setLoading(true); // 点击按钮后，设置 loading 为 true

        try {
          const response = await fetch(
              `http://localhost:8101/api/bodyData/recommend/${userId}?mood=${encodeURIComponent(mood)}`, 
              {
                  method: 'GET', // 使用 GET 请求
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'Accept': '*/*', // 确保接受任意类型的响应
                  }
              }
          );

            const result = await response.text();
            console.log(result); // 输出返回的所有数据

            if (result) {
                const formattedReport = result.replace(/\n/g, '<br />');
                setReport(formattedReport);
            } else {
                setMessage('No recommendation available for this mood.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again later.');
        } finally {
            setLoading(false); // 请求完成后，无论成功与否，都将 loading 设置为 false
        }
    };

    return (
        <div className="flex min-h-screen"> {/* 使用 flex 布局，确保覆盖全屏 */}
          
            {/* Sidebar 始终在左侧 */}
            <Sidebar />

            {/* 右侧内容区域 */}
            <div className="flex-grow flex flex-col h-full min-h-screen-b bg-gradient-to-b from-blue-50 to-purple-100 min-h-screen"> {/* 使用 min-h-screen 来确保背景覆盖全屏 */}
                {/* Header 显示用户名 */}
                <header className="p-6 bg-transparent">
                    <ShowUser />
                </header>

                {/* 内容部分 */}
                <div className="flex-grow flex items-center justify-center">
                    <div className="max-w-3xl w-full bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-12">
                        
                        <h1 className="text-[#1a1a1a] text-6xl font-bold mb-6 leading-tight">
                            Mood-based Music Recommendation
                        </h1>

                        <p className="text-gray-600 text-xl mb-12 max-w-3xl mx-auto">
                            Select or enter your mood to get personalized music recommendations.
                        </p>

                        <h1 className="text-3xl font-semibold text-[#1a1a1a] mb-6 text-center">Choose or Enter Your Mood</h1>

                        <div className="flex justify-center mb-6 space-x-4">
                            {emojis.map((emoji) => (
                                <button
                                    key={emoji.value}
                                    onClick={() => handleEmojiClick(emoji.value)}
                                    className={`px-4 py-2 rounded-full text-white bg-${emoji.value === mood ? 'blue-500' : 'gray-500'} hover:bg-blue-600 transition`}
                                >
                                    {emoji.label} {/* 使用 emoji 表情 */}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleGenerateRecommendation}>
                            <input
                                type="text"
                                value={mood}
                                onChange={(e) => setMood(e.target.value)} // 用户手动输入心情
                                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                                placeholder="Or enter your mood..."
                            />

                            <button
                                type="submit"
                                className="mt-6 w-full bg-[#1a1a1a] text-white py-3 rounded-lg hover:bg-opacity-90 transition duration-300"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex justify-center items-center">
                                        <svg
                                            className="animate-spin h-5 w-5 mr-3 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v8H4z"
                                            ></path>
                                        </svg>
                                        Loading...
                                    </span>
                                ) : (
                                    'Get Music Recommendation'
                                )}
                            </button>
                            {message && <p className="text-gray-700 text-center mt-4">{message}</p>}
                            {report && <div className="mt-6 text-gray-800" dangerouslySetInnerHTML={{ __html: report }}></div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecommendMood;
