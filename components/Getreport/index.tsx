import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Getreport = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [report, setReport] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // 新增loading状态
    const router = useRouter();

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

    const handleGenerateReport = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userId) {
            setMessage('User ID not found.');
            return;
        }

        setLoading(true); // 点击按钮后，设置 loading 为 true

        try {
            const response = await fetch(`http://localhost:8101/api/bodyData/generate-diet-plan/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });

            // 使用 text() 解析响应为文本，而不是 json
            const result = await response.text();
            console.log(result); // 输出返回的所有数据

            // 假设后端返回的报告是纯文本格式
            if (result) {
                // 处理换行符，转换为 <br /> 标签
                const formattedReport = result.replace(/\n/g, '<br />');
                setReport(formattedReport); // 显示格式化的报告内容
            } else {
                setMessage('Please wear equipment.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again later.');
        } finally {
            setLoading(false); // 请求完成后，无论成功与否，都将 loading 设置为 false
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 flex items-center justify-center">
            <div className="max-w-3xl w-full bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-12"> {/* 调整宽度为 max-w-3xl */}
                
                <h1 className="text-[#1a1a1a] text-6xl font-bold mb-6 leading-tight">
                Automatic Meal and Diet Planning
                    <br />
                    
                </h1>

                <p className="text-gray-600 text-xl mb-12 max-w-3xl mx-auto">
                Have questions about your meal plans and recipes? Click Generate Report to get a great suggestion according your body data!
                </p>

                <div className="max-w-lg mx-auto mb-12">
                    
                </div>

                <h1 className="text-3xl font-semibold text-[#1a1a1a] mb-6 text-center">Generate Body Data Report</h1>

                <form onSubmit={handleGenerateReport}>
                    <button
                        type="submit"
                        className="w-full bg-[#1a1a1a] text-white py-3 rounded-lg hover:bg-opacity-90 transition duration-300"
                        disabled={loading} // 如果正在加载，禁用按钮
                    >
                        {loading ? ( // 根据loading状态显示不同的内容
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
                            'Generate Report'
                        )}
                    </button>
                    {message && <p className="text-gray-700 text-center mt-4">{message}</p>}
                    {report && <div className="mt-6 text-gray-800" dangerouslySetInnerHTML={{ __html: report }}></div>}
                </form>
            </div>
        </div>
    );
};

export default Getreport;
