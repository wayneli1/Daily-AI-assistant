import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ShowUser: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  /**useEffect(() => {
    // 从 localStorage 中获取用户名
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      // 如果没有用户名，重定向到登录页面
      window.alert('please login first！')
      router.push('/login');
    } else {
      setUsername(storedUsername);
    }
  }, [router]); /** */

  return (
    <div>
      {/* 如果用户名存在，显示用户名 */}
      {username ? <span>Welcome, {username}!</span> : null}
    </div>
  );
};

export default ShowUser;
