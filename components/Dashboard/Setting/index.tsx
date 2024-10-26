import { useState, useEffect, ChangeEvent } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Setting = () => {
    const [userData, setUserData] = useState({
        id: '',
        userName: '',
        userProfile: '',
        userAvatar: '',
        userRole: 'user',
    });
    const [newAvatar, setNewAvatar] = useState<File | null>(null); // 用于存储新头像文件
    const [previewAvatar, setPreviewAvatar] = useState<string | null>(null); // 用于本地预览新头像
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUserId = localStorage.getItem('id');

            if (!storedUserId) {
                setError('User is not logged in.');
                router.push('/login');
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
                
                console.log('Fetched user data:', result);

                if (result.code === 0 && result.data) {
                    setUserData({
                        id: result.data.id,
                        userName: result.data.userName,
                        userProfile: result.data.userProfile || '',
                        userAvatar: result.data.userAvatar || '',
                        userRole: result.data.userRole || 'user',
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
        const file = e.target.files?.[0];
        if (file) {
            setNewAvatar(file); // 保存文件
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    setPreviewAvatar(reader.result); // 设置预览图像
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveChanges = async () => {
        if (!newAvatar) {
            setMessage('Please select an avatar before saving.');
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('id', userData.id);
            formData.append('avatar', newAvatar);
    
            const response = await fetch('http://localhost:8101/api/user/upload-avatar', {
                method: 'POST',
                body: formData,
            });
    
            const result = await response.json();
            console.log('Upload result:', result);
    
            // 确保 result.data 是一个有效的 URL
            if (result.code === 0 && result.data && result.data.startsWith('https')) {
                setUserData((prev) => ({
                    ...prev,
                    userAvatar: result.data, // 使用返回的头像 URL 更新
                }));
                setPreviewAvatar(null);
                setNewAvatar(null);
                setMessage('Avatar updated successfully');
                localStorage.setItem('userAvatar', result.data);
            } else {
                setMessage('Failed to update avatar');
            }
        } catch (err) {
            console.error('Error updating avatar:', err);
            setMessage('An error occurred. Please try again.');
        }
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
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 flex items-center justify-center">
                <div className="max-w-3xl w-full bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-12 shadow-lg">
                    <h2 className="text-3xl font-semibold text-[#1a1a1a] mb-6">Profile</h2>
                    <p className="text-gray-600 mb-6">You can update your profile information below.</p>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                        <input
                            type="text"
                            value={userData.id}
                            className="w-full border border-gray-300 rounded-md p-2 bg-white bg-opacity-80"
                            readOnly
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            value={userData.userName}
                            onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
                            className="w-full border border-gray-300 rounded-md p-2 bg-white bg-opacity-80"
                            readOnly
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
                        <textarea
                            className="w-full border border-gray-300 rounded-md p-2 h-24 bg-white bg-opacity-80"
                            value={userData.userProfile}
                            onChange={(e) => setUserData({ ...userData, userProfile: e.target.value })}
                            readOnly
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                        <div className="flex items-center">
                            {previewAvatar ? (
                                <Image
                                    src={previewAvatar}
                                    alt="Preview Avatar"
                                    width={48}
                                    height={48}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                            ) : userData.userAvatar ? (
                                <Image
                                    src={`${userData.userAvatar}?t=${new Date().getTime()}`}
                                    alt="User Avatar"
                                    width={48}
                                    height={48}
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
                                    onChange={handleChangeAvatar}
                                />
                            </label>
                        </div>
                    </div>

                    <button
                        className="w-full bg-[#1a1a1a] text-white py-3 rounded-lg hover:bg-opacity-90 transition duration-300"
                        onClick={handleSaveChanges}
                    >
                        Save Changes
                    </button>

                    {message && <p className="text-green-500 text-center mt-4">{message}</p>}
                </div>
            </div>
        </>
    );
};

export default Setting;
