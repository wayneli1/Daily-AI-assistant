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
            /*router.push('/login'); */// 如果未登录，跳转到登录页面
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

            const result = await response.json();
            console.log(result); // 输出返回的所有数据

            if (result && result.data && result.data.length > 0) {
                // 假设后端已经生成报告，直接显示
                setReport(result.data.report);
            } else {
                setMessage('请佩戴设备');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpg')" }}>
            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-8 w-96">
                <h1 className="text-3xl font-semibold text-white mb-6 text-center">Generate Body Data Report</h1>
                
                <form onSubmit={handleGenerateReport}>
                    <button type="submit" className="w-full bg-white bg-opacity-20 text-white py-2 rounded-md hover:bg-opacity-30 transition duration-300">
                        Generate Report
                    </button>
                    {message && <p className="text-white text-center mt-4">{message}</p>}
                    {report && <div className="mt-6 text-white">{report}</div>}
                </form>
            </div>
        </div>
    );
};

export default Getreport;
