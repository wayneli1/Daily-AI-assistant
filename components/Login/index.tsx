import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Login = () => {
    const [userAccount, setUserAccount] = useState(''); // 改为 userAccount
    const [userPassword, setUserPassword] = useState(''); // 改为 userPassword
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // 阻止表单的默认提交

        // 构建请求体
        const data = { userAccount, userPassword }; // 使用新的字段名

        try {
            const response = await fetch('http://localhost:8101/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // 将用户凭证发送到后端
            });
    
            const result = await response.json();
            console.log(result); // 输出返回的所有数据

if (result.message === 'ok' && result.code == '0') {
    // 使用 userAccount 代替 userName
    localStorage.setItem('userName', result.data.userName); // 使用 'userAccount' 存储
    console.log('Result data:', result.data); 
    
    router.push('/dashboard');
} else {
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
                            value={userAccount}
                            onChange={(e) => setUserAccount(e.target.value)} // 改为 setUserAccount
                            className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-white::placeholder focus:outline-none focus:ring-2 focus:ring-white" 
                        />
                    </div>
                    <div className="mb-6 relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" 
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)} // 改为 setUserPassword
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
