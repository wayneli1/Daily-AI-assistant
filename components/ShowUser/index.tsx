import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ShowUser: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const router = useRouter();

  const defaultAvatar = '/loopy.jpg'; // 默认头像路径

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    const storedUserAvatar = localStorage.getItem('userAvatar'); // 尝试从 localStorage 获取用户头像
    
    if (!storedUserName) {
      // 如果没有 userName，重定向到登录页面
      window.alert('Please login first!');
      router.push('/login');
    } else {
      setUserName(storedUserName);
      setUserAvatar(storedUserAvatar || defaultAvatar); // 优先显示 localStorage 中的头像
    }
  }, [router]);

  return (
    <div className="flex justify-end items-center space-x-4 p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg rounded-lg">
      <div className="flex items-center space-x-3">
        <span className="text-lg font-bold tracking-wide">
          {userName ? `Welcome, ${userName}!` : 'Welcome!'}
        </span>
        <img
          src={userAvatar || defaultAvatar}
          alt="User Avatar"
          className="w-12 h-12 rounded-full border-2 border-white shadow-xl object-cover transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </div>
    </div>
  );
};

export default ShowUser;
