import { useState, useEffect, ChangeEvent } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Setting = () => {
    const [userData, setUserData] = useState({
        id: '',
        userName: '',
        userProfile: '',
        userAvatar: '',
        userRole: 'user', // 默认角色是 user
    });
    const [newAvatar, setNewAvatar] = useState<File | null>(null); // 用于存储新头像
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUserId = localStorage.getItem('id'); // 从 localStorage 获取用户 id

            if (!storedUserId) {
                setError('User is not logged in.');
                router.push('/login'); // 如果未登录，跳转到登录页面
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:8101/api/user/get/vo?id=${storedUserId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                
                console.log('Fetched user data:', result); // 打印从 API 返回的数据

                if (result.code === 0 && result.data) {
                    setUserData({
                        id: result.data.id,
                        userName: result.data.userName,
                        userProfile: result.data.userProfile || '',
                        userAvatar: result.data.userAvatar || '',
                        userRole: result.data.userRole || 'user', // 处理用户角色
                    });
                } else {
                    setError('Failed to load user data.');
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('An error occurred while fetching user data.');
                setLoading(false);
            }
        };

        fetchUserData();
    }, [router]);

    const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // 使用安全的可选链操作符
        if (file) {
            setNewAvatar(file); // 保存新头像
        }
    };

    const handleSaveChanges = async () => {
        try {
            const updatedUserData = {
                id: userData.id,
                userName: userData.userName,
                userProfile: userData.userProfile,
                userRole: userData.userRole, // 提交用户角色
                userAvatar: userData.userAvatar, // 如果用户不上传新的头像，保持旧头像
            };

            if (newAvatar) {
                // 如果用户上传了新头像
                updatedUserData.userAvatar = await convertFileToBase64(newAvatar); // 将文件转换为 Base64 格式
            }

            const response = await fetch('http://localhost:8101/api/user/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUserData), // 以 JSON 格式发送数据
            });

            const result = await response.json();
            if (result.code === 0) {
                setMessage('Profile updated successfully');
            } else {
                setMessage('Failed to update profile');
            }
        } catch (err) {
            console.error('Error updating profile:', err);
            setMessage('An error occurred. Please try again.');
        }
    };

    // 辅助函数：将文件转换为 Base64
    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result);
                } else {
                    reject(new Error('FileReader result is not a string'));
                }
            };
            reader.onerror = (error) => reject(error);
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <>
            <Head>
                <title>Profile Page</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
            </Head>
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-semibold mb-4">Profile</h2>
                <p className="text-gray-600 mb-6">You can update your profile information below.</p>

                {/* 显示用户的 ID */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                    <input
                        type="text"
                        value={userData.id} // 显示用户的 id
                        className="w-full border border-gray-300 rounded-md p-2"
                        readOnly
                    />
                </div>
                
                {/* 可修改的用户名 */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                        type="text"
                        value={userData.userName}
                        onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                
                {/* 可修改的个人简介 */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
                    <textarea
                        className="w-full border border-gray-300 rounded-md p-2 h-24"
                        value={userData.userProfile}
                        onChange={(e) => setUserData({ ...userData, userProfile: e.target.value })}
                    />
                </div>

                {/* 修改头像 */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                    <div className="flex items-center">
                        {userData.userAvatar ? (
                            <img
                                src={userData.userAvatar}
                                alt="User Avatar"
                                className="w-12 h-12 rounded-full mr-4"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                                <i className="fas fa-user text-gray-400 text-2xl"></i>
                            </div>
                        )}
                        <label className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md cursor-pointer">
                            Change
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleChangeAvatar} // 上传新头像
                            />
                        </label>
                    </div>
                </div>

                <button
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    onClick={handleSaveChanges} // 保存更改
                >
                    Save Changes
                </button>

                {message && <p className="text-green-500 text-center mt-4">{message}</p>}
            </div>
        </>
    );
};

export default Setting;
