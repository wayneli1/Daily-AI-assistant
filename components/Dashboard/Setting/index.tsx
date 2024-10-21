import { useState } from 'react';
import { useRouter } from 'next/router';

const Setting = () => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const router = useRouter();

  // 处理文件选择
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
    }
  };

  // 处理上传
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!avatar) {
      setMessage('Please select an avatar.');
      return;
    }

    // 获取 userId
    const userName = localStorage.getItem('userName');  // 从 localStorage 获取用户名
    if (!userName) {
      setMessage('User is not logged in.');
      return;
    }

    // 将头像文件转换为 Base64
    const reader = new FileReader();
    reader.readAsDataURL(avatar);
    reader.onloadend = async () => {
      const base64Image = reader.result as string;

      const data = {
        userName, // 假设后端需要用户名
        userAvatar: base64Image, // Base64 图片字符串
      };

      try {
        const response = await fetch('http://localhost:8101/api/user/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log(result); // 输出返回的所有数据

        // 检查后端响应是否有 userAvatar 数据
        if (response.ok && result.data && result.data.userAvatar) {
          // 更新本地存储中的头像
          localStorage.setItem('userAvatar', result.data.userAvatar);

          setMessage('Avatar uploaded successfully.');
          router.push('/dashboard'); // 上传成功后跳转到 dashboard
        } else {
          setMessage(result.message || 'Avatar upload failed. No userAvatar returned.');
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage('An error occurred. Please try again later.');
      }
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Upload Avatar</h1>
        <form onSubmit={handleUpload}>
          <div className="mb-4">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="border rounded p-2 w-full"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Upload
          </button>
          {message && <p className="text-red-500 mt-4">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Setting;
