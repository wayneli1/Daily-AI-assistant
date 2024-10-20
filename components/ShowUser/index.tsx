import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ShowUser: React.FC = () => {
  const [userAccount, setUserAccount] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // 从 localStorage 中获取 userAccount
    const storedUserAccount = localStorage.getItem('userAccount');
    if (!storedUserAccount) {
      // 如果没有 userAccount，重定向到登录页面
      window.alert('Please login first!');
      router.push('/login');
    } else {
      setUserAccount(storedUserAccount);
    }
  }, [router]);

  return (
    <div>
      {/* 如果 userAccount 存在，显示用户信息 */}
      {userAccount ? <span>Welcome, {userAccount}!</span> : null}
    </div>
  );
};

export default ShowUser;
