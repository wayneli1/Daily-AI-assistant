import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // 阻止表单的默认提交

        // 构建请求体
        const data = { username, password };

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // 将用户凭证发送到后端
            });

            const result = await response.json();

            if (response.ok) {
                // 登录成功，将 JWT 存储到 localStorage
                localStorage.setItem('token', result.token);
                
                // 重定向到 dashboard 页面
                router.push('/dashboard');
            } else {
                // 处理错误
                setMessage(result.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpg')" }}>
            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-8 w-96">
                <h1 className="text-3xl font-semibold text-white mb-6 text-center">Login</h1>
                
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-white::placeholder focus:outline-none focus:ring-2 focus:ring-white" 
                        />
                    </div>
                    <div className="mb-6 relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-white::placeholder focus:outline-none focus:ring-2 focus:ring-white" 
                        />
                        <span 
                            className="absolute right-3 top-2.5 text-white cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </span>
                    </div>
                    <button type="submit" className="w-full bg-white bg-opacity-20 text-white py-2 rounded-md hover:bg-opacity-30 transition duration-300">
                        SIGN IN
                    </button>
                    {message && <p className="text-white text-center mt-4">{message}</p>}
                    <div className="flex justify-between items-center mt-4 text-sm text-white">
                        <Link href="/register">
                            <button className="bg-transparent">Don't have an account?</button>
                        </Link>
                        <Link href="/">
                            <button className="bg-transparent">Back to home</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
