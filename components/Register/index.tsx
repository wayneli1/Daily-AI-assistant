import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Register = () => {
    const [userAccount, setUserAccount] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [message, setMessage] = useState('');

    const router = useRouter(); // 使用 useRouter 钩子

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault(); // 阻止表单的默认提交行为

        if (userPassword !== checkPassword) {
            setMessage('Passwords do not match!');
            return;
        }

        // 构建发送到后端的请求体
        const data = {
            userAccount,
            userPassword,
            checkPassword,
        };

        try {
            const response = await fetch('http://localhost:8101/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                // 注册成功，显示消息并重定向到 login 页面
                setMessage('Registration successful! Redirecting to login page...');
                // 延迟 2 秒后重定向到 login 页面
                setTimeout(() => {
                    router.push('/login'); // 重定向到 login 页面
                }, 2000); 
            } else {
                // 处理注册失败情况
                setMessage(result.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpg')" }}>
            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-8 w-96">
                <h1 className="text-3xl font-semibold text-white mb-6 text-center">Register</h1>

                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={userAccount} 
                            onChange={(e) => setUserAccount(e.target.value)} 
                            className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-white::placeholder focus:outline-none focus:ring-2 focus:ring-white" 
                        />
                    </div>
                    <div className="mb-6">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)} 
                            className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-white::placeholder focus:outline-none focus:ring-2 focus:ring-white" 
                        />
                    </div>
                    <div className="mb-6">
                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            value={checkPassword}
                            onChange={(e) => setCheckPassword(e.target.value)} 
                            className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-white::placeholder focus:outline-none focus:ring-2 focus:ring-white" 
                        />
                    </div>
                    <button type="submit" className="w-full bg-white bg-opacity-20 text-white py-2 rounded-md hover:bg-opacity-30 transition duration-300">
                        Sign In
                    </button>
                    {message && <p className="text-white text-center mt-4">{message}</p>}
                </form>
                <div className="flex justify-between items-center mt-4 text-sm text-white">
                       
                        <Link href="/">
                            <button className="bg-transparent">Back to home</button>
                        </Link>
                    </div>
            </div>
           
        </div>
    );
};

export default Register;
