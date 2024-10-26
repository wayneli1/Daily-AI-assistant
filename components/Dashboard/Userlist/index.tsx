import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface User {
  id: number;
  userAccount: string;
  userName: string;
  userAvatar: string | null;
  userProfile: string | null;
  userRole: string;
}

const UserList: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Check login status before fetching the user list
  const checkLoginStatus = async () => {
    try {
      const response = await fetch('http://localhost:8101/api/user/get/login', {
        method: 'GET',
        credentials: 'include', // 确保携带 Cookie 信息
      });

      const result = await response.json();
      console.log('Login check result:', result); // 调试：查看登录状态

      if (result.code === 0 && result.data) {
        // 如果登录成功，继续获取用户列表
        fetchUsers();
      } else {
        alert('You are not logged in. Redirecting to login page.');
        router.push('/login'); // 重定向到登录页面
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error checking login status:', error.message);
      } else {
        console.error('An unknown error occurred while checking login status:', error);
      }
      alert('Error checking login status. Please try again.');
      router.push('/login');
    }
  };

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8101/api/user/list/page', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 确保在请求中携带 Cookie 信息
        body: JSON.stringify({
          current: 1,
          pageSize: 10,
          sortField: '',
          sortOrder: '',
          id: null,
          userName: '',
          userProfile: '',
          userRole: '',
        }),
      });

      console.log('Response status:', response.status); // 调试：查看响应状态码
      const result = await response.json();
      console.log('Fetched user data:', result); // 调试：查看响应体

      if (result.code === 0) { // 检查响应中的 code 是否为 0，表示成功
        setUsers(result.data.records || []);
      } else {
        console.error('Failed to fetch user list:', result.message);
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching users:', error.message);
        alert(`Error fetching users: ${error.message}`);
      } else {
        console.error('An unknown error occurred:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Check if the user is logged in and then fetch the user list
  useEffect(() => {
    checkLoginStatus();
  }, [router]);

  // Delete user
  const deleteUser = async (userId: number) => {
    try {
      const response = await fetch('http://localhost:8101/api/user/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 确保在请求中携带 Cookie 信息
        body: JSON.stringify({
          id: userId, // 确保请求体包含 id 字段
        }),
      });

      const result = await response.json();
      console.log('Delete response:', result); // 调试：查看删除的响应数据
      if (result.code === 0) {
        // 从用户列表中移除已删除的用户
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } else {
        console.error('Failed to delete user:', result.message);
        alert(`Failed to delete user: ${result.message}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting user:', error.message);
        alert(`Error deleting user: ${error.message}`);
      } else {
        console.error('An unknown error occurred while deleting user:', error);
      }
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">User List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {/* Header */}
          <div className="grid grid-cols-6 text-sm text-gray-500 mb-2">
            <div>USER ACCOUNT</div>
            <div>USER NAME</div>
            <div>USER AVATAR</div>
            <div>USER PROFILE</div>
            <div>USER ROLE</div>
            <div>ACTIONS</div>
          </div>

          {/* User List */}
          {users.map((user) => (
            <div key={user.id} className="grid grid-cols-6 items-center py-4 border-t border-gray-100">
              <div>{user.userAccount}</div>
              <div>{user.userName}</div>
              <div>
                {user.userAvatar ? (
                  <img src={user.userAvatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                ) : (
                  <span className="text-gray-400">No Avatar</span>
                )}
              </div>
              <div>{user.userProfile || 'No Profile'}</div>
              <div className={user.userRole === 'admin' ? 'text-blue-600' : 'text-gray-600'}>
                {user.userRole}
              </div>
              <div className="flex gap-2">
                <button
                  className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:translate-y-[2px]"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
