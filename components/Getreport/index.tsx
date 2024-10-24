import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Getreport = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [report, setReport] = useState('');
    const [message, setMessage] = useState('');
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
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/bg2.png')" }}>
            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-8 w-1/2"> {/* 修改宽度为 1/2 屏幕宽度 */}
                <h1 className="text-3xl font-semibold text-white mb-6 text-center">Generate Body Data Report</h1>
                
                <form onSubmit={handleGenerateReport}>
                    <button type="submit" className="w-full bg-white bg-opacity-20 text-white py-2 rounded-md hover:bg-opacity-30 transition duration-300">
                        Generate Report
                    </button>
                    {message && <p className="text-white text-center mt-4">{message}</p>}
                    {report && <div className="mt-6 text-white" dangerouslySetInnerHTML={{ __html: report }}></div>}
                </form>
            </div>
        </div>
    );
};

export default Getreport;
