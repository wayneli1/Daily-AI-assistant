import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
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
    // Simulated heart rate data (10 seconds of data)
    const heartRateData = {
        labels: ['1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', '10s'],
        datasets: [
            {
                label: 'Heart Rate (BPM)',
                data: [68, 70, 72, 71, 73, 70, 72, 73, 69, 70],
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
            },
        ],
    };

    // Sleep quality data for the doughnut chart
    const sleepQualityData = {
        labels: ['Deep Sleep', 'Light Sleep', 'REM Sleep'],
        datasets: [
            {
                label: 'Sleep Quality',
                data: [28, 56, 16],  // Simulated sleep data
                backgroundColor: ['#0e5fd9', '#ff9400', '#e84545'],
            },
        ],
    };

    return (
        <div className="w-full h-auto p-10 bg-[#fef7ff]">
            {/* Title and welcome message */}
            <div className="text-center mb-10">
                <h1 className="text-5xl font-bold mb-4">Intelligent Health Monitoring</h1>
                <p className="text-lg">
                    Welcome to your health dashboard. View vital signs, generate health reports, and get medication reminders set by your doctor.
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
                        <p className="text-4xl font-bold">72 BPM</p>
                        <p className="text-green-500">6.7% Increase</p>
                    </div>

                    {/* Steps per minute card */}
                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                        <h2 className="text-xl font-semibold">Steps Per Minute</h2>
                        <p className="text-4xl font-bold">105 Steps/Minute</p>
                        <p className="text-red-500">13.5% Decrease</p>
                    </div>

                    {/* Line chart */}
                    <div className="bg-white p-6 rounded-lg shadow" style={{ height: '820px' }}>
                        <h2 className="text-xl font-semibold mb-4">Heart Rate Chart</h2>
                        <Line
                            data={heartRateData}
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
                        <p className="text-4xl font-bold">7.3 hours/day</p>
                        <p className="text-green-500">6.7% Increase</p>
                    </div>

                    {/* Calories burned card */}
                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                        <h2 className="text-xl font-semibold">Calories Burned</h2>
                        <p className="text-4xl font-bold">350 Calories</p>
                        <p className="text-green-500">1.7% Increase</p>
                    </div>

                    {/* Doughnut chart */}
                    <div className="bg-white p-6 rounded-lg shadow" style={{ height: '820px' }}>
                        <h2 className="text-xl font-semibold">Sleep Quality</h2>
                        <Doughnut data={sleepQualityData} />
                        <div className="flex justify-between mt-4">
                            <p>Deep Sleep: 28%</p>
                            <p>Light Sleep: 56%</p>
                            <p>REM Sleep: 16%</p>
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
                                    Based on the recent health monitoring data, your average heart rate is 72 BPM, which
                                    shows a 6.7% increase. Your sleep quality indicates that you have sufficient deep
                                    sleep (28%), but the light sleep (56%) could be improved. Your physical activity
                                    level, as measured by steps per minute, has slightly decreased by 13.5%, and
                                    calories burned are stable at 350 calories per day. Overall, your health status
                                    score is excellent at 97, but maintaining consistent activity levels and improving
                                    sleep efficiency is recommended for optimal health.
                                </p>
                            </div>
                        </div>
                        <p className="mt-4">Health Status Score: <span className="font-bold text-xl">97</span></p>
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-4">
                        <button className="flex-1 px-6 py-2 bg-[#d0bcff] text-lg rounded-full">Medicine Plan</button>
                        <button className="flex-1 px-6 py-2 bg-[#d0bcff] text-lg rounded-full">
                            Doctor: Smith {/* Placeholder for {doctorName} */}
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
    );
};

export default HealthMonitoring;