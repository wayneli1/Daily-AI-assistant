import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Doughnut } from 'react-chartjs-2';
import ShowUser from '@/components/ShowUser';
import Sidebar from '@/components/SideBar';
import ReactMarkdown from 'react-markdown';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const HealthMonitoring: React.FC = () => {
    const [heartRateData, setHeartRateData] = useState<number[]>([]);
    const [averageHeartRate, setAverageHeartRate] = useState<number | null>(null);
    const [stepsPerMinute, setStepsPerMinute] = useState<number | null>(null);
    const [sleepTime, setSleepTime] = useState<number | null>(null);
    const [deepSleep, setDeepSleep] = useState<number | null>(null);
    const [lightSleep, setLightSleep] = useState<number | null>(null);
    const [remSleep, setRemSleep] = useState<number | null>(null);
    const [caloriesBurned, setCaloriesBurned] = useState<number | null>(null);
    const [doctorName, setDoctorName] = useState<string>('');
    const [healthReport, setHealthReport] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const userId = 1; // Replace with actual user ID

    useEffect(() => {
        axios.get(`http://localhost:8101/api/healthData/get?userId=${userId}`)
            .then(response => {
                const data = response.data.data;
                if (data) {
                    setHeartRateData(data.heartRate.split(',').map(Number));
                    setAverageHeartRate(data.averageHeartRate);
                    setStepsPerMinute(data.stepsPerMinute);
                    setSleepTime(data.sleepTime);
                    setDeepSleep(data.deepSleep);
                    setLightSleep(data.lightSleep);
                    setRemSleep(data.remSleep);
                    setCaloriesBurned(data.caloriesBurned);
                    setDoctorName(data.doctorName);
                }
            })
            .catch(error => {
                console.error("Error fetching health data: ", error);
            });
    }, []);

    const handleGenerateHealthReport = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8101/api/healthData/generate-health-report/${userId}`);
            setHealthReport(response.data); // Assume response is Markdown text
        } catch (error) {
            console.error("Error generating health report: ", error);
            setHealthReport("An error occurred while generating the health report.");
        } finally {
            setLoading(false);
        }
    };

    const heartRateChartData = {
        labels: ['1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', '10s'],
        datasets: [
            {
                label: 'Heart Rate (BPM)',
                data: heartRateData,
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
            },
        ],
    };

    const sleepQualityData = {
        labels: ['Deep Sleep', 'Light Sleep', 'REM Sleep'],
        datasets: [
            {
                label: 'Sleep Quality',
                data: [deepSleep, lightSleep, remSleep],
                backgroundColor: ['#0e5fd9', '#ff9400', '#e84545'],
            },
        ],
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar className="w-64" />
            <div className="flex-grow ml-64">
                <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Dashboard</h1>
                    <ShowUser />
                </header>
                <div className="w-full h-auto p-10 bg-[#fef7ff]">
                    <div className="text-center mb-10">
                        <h1 className="text-5xl font-bold mb-4">Intelligent Health Monitoring</h1>
                        <p className="text-lg">
                            Welcome to your health dashboard. View vital signs, generate health reports, and get medication reminders set by your doctor.
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-8">
                        <div className="col-span-1">
                            <div className="bg-white p-6 rounded-lg shadow mb-6">
                                <h2 className="text-xl font-semibold">Heart Rate</h2>
                                <p className="text-4xl font-bold">{averageHeartRate} BPM</p>
                                <p className="text-green-500">6.7% Increase</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow mb-6">
                                <h2 className="text-xl font-semibold">Steps Per Minute</h2>
                                <p className="text-4xl font-bold">{stepsPerMinute} Steps/Minute</p>
                                <p className="text-red-500">13.5% Decrease</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow mb-6" style={{height: '600px'}} >
                                <h2 className="text-xl font-semibold mb-4">Heart Rate Chart</h2>
                                <Line data={heartRateChartData} options={{ maintainAspectRatio: false, scales: { y: { min: 65, max: 75 }}}} />
                            </div>
                            {/* Buttons */}
                            <div className="flex space-x-4 mb-6">
                                <button
                                    className="flex-1 h-full aspect-square bg-[#d0bcff] text-lg rounded-full flex items-center justify-center">
                                    Medicine Plan
                                </button>
                                <button
                                    className="flex-1 h-full aspect-square bg-[#d0bcff] text-lg rounded-full flex items-center justify-center">
                                    Doctor: {doctorName}
                                </button>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="bg-white p-6 rounded-lg shadow mb-6">
                                <h2 className="text-xl font-semibold">Sleep Time</h2>
                                <p className="text-4xl font-bold">{sleepTime} hours/day</p>
                                <p className="text-green-500">6.7% Increase</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow mb-6">
                                <h2 className="text-xl font-semibold">Calories Burned</h2>
                                <p className="text-4xl font-bold">{caloriesBurned} Calories</p>
                                <p className="text-green-500">1.7% Increase</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow mb-6" style={{height: '600px'}}>
                                <h2 className="text-xl font-semibold">Sleep Quality</h2>
                                <Doughnut data={sleepQualityData} />
                                <div className="flex justify-between mt-4">
                                    <p>Deep Sleep: {deepSleep}%</p>
                                    <p>Light Sleep: {lightSleep}%</p>
                                    <p>REM Sleep: {remSleep}%</p>
                                </div>
                            </div>
                            {/* Medicine Intake Plan */}
                            <div className="bg-white p-6 rounded-lg shadow mb-6">
                                <h2 className="text-xl font-semibold">Medicine Intake Plan</h2>
                                <div className="space-y-2 mt-4">
                                    {[...Array(3)].map((_, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <img src="/medicine.png" alt="Medicine" className="w-12 h-12"/>
                                            <p>Medicine Name / Times / Alerts</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 space-y-6">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-xl font-semibold">Health Report</h2>
                                <div className="flex space-x-4 mt-4">
                                    <img
                                        src="/HealthReport.png"
                                        alt="Health Report"
                                        className="w-12 h-12 cursor-pointer"
                                        onClick={handleGenerateHealthReport}
                                    />
                                    <div>
                                        {loading ? (
                                            <p className="text-xl">Generating report...</p>
                                        ) : (
                                            <ReactMarkdown className="text-xl" children={healthReport} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthMonitoring;
