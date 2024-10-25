import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Doughnut } from 'react-chartjs-2';
import ShowUser from '@/components/ShowUser';
import Sidebar from '@/components/SideBar';
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

// Manually register necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const HealthMonitoring: React.FC = () => {
    // States to store data fetched from API
    const [heartRateData, setHeartRateData] = useState<number[]>([]);
    const [averageHeartRate, setAverageHeartRate] = useState<number | null>(null);
    const [stepsPerMinute, setStepsPerMinute] = useState<number | null>(null);
    const [sleepTime, setSleepTime] = useState<number | null>(null);
    const [deepSleep, setDeepSleep] = useState<number | null>(null);
    const [lightSleep, setLightSleep] = useState<number | null>(null);
    const [remSleep, setRemSleep] = useState<number | null>(null);
    const [caloriesBurned, setCaloriesBurned] = useState<number | null>(null);
    const [doctorName, setDoctorName] = useState<string>('');

    // Use useEffect to fetch data from API on component mount
    useEffect(() => {
        // Replace with your API endpoint
        axios.get('http://localhost:8101/api/healthData/get?userId=1')
            .then(response => {
                const data = response.data.data; // Update to access data inside 'data'
                if (data) {
                    setHeartRateData(data.heartRate.split(',').map(Number)); // Convert heartRate to array of numbers
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
                data: [deepSleep, lightSleep, remSleep], // Dynamic data from state
                backgroundColor: ['#0e5fd9', '#ff9400', '#e84545'],
            },
        ],
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar className="w-64" /> {/* 为侧边栏设置固定宽度 */}

            {/* 右侧内容区域 */}
            <div className="flex-grow ml-64"> {/* 设置margin-left，以避免覆盖 */}
                {/* Header 显示用户名 */}
                <header
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Dashboard</h1>
                    <ShowUser/>
                </header>

                {/* 页面内容 */}
                <div className="w-full h-auto p-10 bg-[#fef7ff]">
                    {/* Title and welcome message */}
                    <div className="text-center mb-10">
                        <h1 className="text-5xl font-bold mb-4">Intelligent Health Monitoring</h1>
                        <p className="text-lg">
                            Welcome to your health dashboard. View vital signs, generate health reports, and get
                            medication reminders set by your doctor.
                            Stay informed and manage your health easily.
                        </p>
                    </div>

                    {/* Buttons for returning and new users */}
                    <div className="flex justify-center space-x-4 mb-10">
                        <button className="px-6 py-2 bg-[#d0bcff] text-lg rounded-full">Returning User</button>
                        <button className="px-6 py-2 border-2 border-[#d0bcff] text-lg rounded-full">New User</button>
                    </div>

                    {/* Grid layout - divided into three sections */}
                    <div className="grid grid-cols-3 gap-8">
                        {/* Left side: Cards and line chart */}
                        <div className="col-span-1">
                            {/* Heart rate card */}
                            <div className="bg-white p-6 rounded-lg shadow mb-6">
                                <h2 className="text-xl font-semibold">Heart Rate</h2>
                                <p className="text-4xl font-bold">{averageHeartRate} BPM</p>
                                <p className="text-green-500">6.7% Increase</p>
                            </div>

                            {/* Steps per minute card */}
                            <div className="bg-white p-6 rounded-lg shadow mb-6">
                                <h2 className="text-xl font-semibold">Steps Per Minute</h2>
                                <p className="text-4xl font-bold">{stepsPerMinute} Steps/Minute</p>
                                <p className="text-red-500">13.5% Decrease</p>
                            </div>

                            {/* Line chart */}
                            <div className="bg-white p-6 rounded-lg shadow" style={{height: '800px'}}>
                                <h2 className="text-xl font-semibold mb-4">Heart Rate Chart</h2>
                                <Line
                                    data={heartRateChartData}
                                    options={{
                                        maintainAspectRatio: false,
                                        scales: {
                                            y: {
                                                min: 65,  // Minimum 65 BPM
                                                max: 75  // Maximum 75 BPM
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        {/* Middle section: Cards and doughnut chart */}
                        <div className="col-span-1">
                            {/* Sleep time card */}
                            <div className="bg-white p-6 rounded-lg shadow mb-6">
                                <h2 className="text-xl font-semibold">Sleep Time</h2>
                                <p className="text-4xl font-bold">{sleepTime} hours/day</p>
                                <p className="text-green-500">6.7% Increase</p>
                            </div>

                            {/* Calories burned card */}
                            <div className="bg-white p-6 rounded-lg shadow mb-6">
                                <h2 className="text-xl font-semibold">Calories Burned</h2>
                                <p className="text-4xl font-bold">{caloriesBurned} Calories</p>
                                <p className="text-green-500">1.7% Increase</p>
                            </div>

                            {/* Doughnut chart */}
                            <div className="bg-white p-6 rounded-lg shadow" style={{height: '800px'}}>
                                <h2 className="text-xl font-semibold">Sleep Quality</h2>
                                <Doughnut data={sleepQualityData}/>
                                <div className="flex justify-between mt-4">
                                    <p>Deep Sleep: {deepSleep}%</p>
                                    <p>Light Sleep: {lightSleep}%</p>
                                    <p>REM Sleep: {remSleep}%</p>
                                </div>
                            </div>
                        </div>

                        {/* Right side: Health report */}
                        <div className="col-span-1 space-y-6"> {/* Note: Using space-y-6 to separate each section */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-xl font-semibold">Health Report</h2>
                                <div className="flex space-x-4 mt-4">
                                    <img src="/HealthReport.png" alt="Health Report" className="w-12 h-12"/>
                                    <div>
                                        <p className="text-xl">
                                            Based on the recent health monitoring data, your average heart rate
                                            is {averageHeartRate} BPM, which
                                            shows a 6.7% increase. Your sleep quality indicates that you have sufficient
                                            deep
                                            sleep ({deepSleep}%), but the light sleep ({lightSleep}%) could be improved.
                                            Your physical activity
                                            level, as measured by steps per minute, has slightly decreased by 13.5%, and
                                            calories burned are stable at {caloriesBurned} calories per day. Overall,
                                            your health status
                                            score is excellent at 97, but maintaining consistent activity levels and
                                            improving
                                            sleep efficiency is recommended for optimal health.
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-4">Health Status Score: <span className="font-bold text-xl">97</span>
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex space-x-4">
                                <button className="flex-1 px-6 py-2 bg-[#d0bcff] text-lg rounded-full">Medicine Plan
                                </button>
                                <button className="flex-1 px-6 py-2 bg-[#d0bcff] text-lg rounded-full">
                                    Doctor: {doctorName} {/* Dynamic doctor name */}
                                </button>
                            </div>

                            {/* Medicine Intake Plan */}
                            <div className="bg-white p-6 rounded-lg shadow">
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthMonitoring;