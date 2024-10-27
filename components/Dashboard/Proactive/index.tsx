import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '@/components/SideBar';
import ShowUser from '@/components/ShowUser';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/router';

const Proactive: React.FC = () => {
    const [userId, setUserId] = useState<string | null>(null); // 从localStorage获取用户ID
    const [healthReport, setHealthReport] = useState(''); // 用于存储整个报告
    const [fitnessData, setFitnessData] = useState<{ label: string, value: string }[]>([]);
    const [nutritionData, setNutritionData] = useState<{ label: string, value: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // 在页面加载时获取用户ID
    useEffect(() => {
        const storedUserId = localStorage.getItem('id'); // 获取用户ID
        if (!storedUserId) {
            router.push('/login'); // 如果未登录，跳转到登录页面
        } else {
            setUserId(storedUserId);
        }
    }, [router]);

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:8101/api/healthData/get?userId=${userId}`)
                .then(response => {
                    const data = response.data.data;
                    if (data) {
                        setFitnessData([
                            { label: 'Steps', value: `${data.stepsPerMinute || 0} steps/day` },
                            { label: 'Heart Rate', value: `${data.averageHeartRate || 0} BPM` },
                            { label: 'Calories Burned', value: `${data.caloriesBurned || 0} calories/day` },
                        ]);

                        setNutritionData([
                            { label: 'Water Intake', value: `${data.waterIntake || 'N/A'} liters/day` },
                            { label: 'Caloric Intake', value: `${data.caloricIntake || 'N/A'} cal/day` },
                            { label: 'Fat Burn Rate', value: `${data.fatBurnRate || 'N/A'}%` },
                        ]);
                    }
                })
                .catch(error => {
                    console.error("Error fetching health data: ", error);
                });
        }
    }, [userId]);

    const handleGenerateHealthReport = async () => {
        if (!userId) return;

        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8101/api/healthData/generate-health-prediction-plan/${userId}`);
            const reportData = response.data.data;
            setHealthReport(reportData || ''); // 将整个报告内容存储在 healthReport 中
        } catch (error) {
            console.error("Error generating health report: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar className="w-64" />

            <div className="flex-grow ml-64">
                {/* Header */}
                <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Proactive Health Insights</h1>
                    <ShowUser />
                </header>

                {/* Introduction Section */}
                <div className="w-full h-auto p-10 bg-[#fef7ff] text-center mb-10">
                    <h1 className="text-5xl font-bold mb-4">Welcome to Proactive Health Insights</h1>
                    <p className="text-lg">
                        View your fitness and nutrition data with AI recommendations for better health management. Stay proactive and informed every day.
                    </p>
                </div>

                {/* Upper Section with Image and Report */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                    {/* Left: HealthInsight Image */}
                    <div className="flex flex-col justify-center items-center">
                        <img src="/healthInsight.png" alt="Health Insight" className="w-80 h-80 mb-4" />
                        {/* Button below the image */}
                        <button
                            className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg text-xl mt-4"
                            onClick={handleGenerateHealthReport}
                        >
                            Generate Health Report
                        </button>
                    </div>

                    {/* Right: Full Health Report */}
                    <div className="bg-white p-6 rounded-lg shadow overflow-y-auto">
                        <h3 className="text-2xl font-semibold mb-4">Health Report</h3>
                        {loading ? <p>Loading...</p> : <ReactMarkdown>{healthReport}</ReactMarkdown>}
                    </div>
                </div>

                {/* Lower Section */}
                <div className="grid grid-cols-2 gap-8">
                    {/* Left: Fitness Data */}
                    <div className="bg-[#e8def8] p-6 rounded-lg shadow">
                        <h2 className="text-4xl font-bold text-center mb-4">Fitness</h2>
                        <div className="space-y-4">
                            {fitnessData.map((item, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="text-xl font-semibold">{item.label}</h3>
                                    <p className="text-2xl font-bold">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Nutrition Data */}
                    <div className="bg-[#d0bcff] p-6 rounded-lg shadow">
                        <h2 className="text-4xl font-bold text-center mb-4">Nutrition</h2>
                        <div className="space-y-4">
                            {nutritionData.map((item, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="text-xl font-semibold">{item.label}</h3>
                                    <p className="text-2xl font-bold">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Proactive;
