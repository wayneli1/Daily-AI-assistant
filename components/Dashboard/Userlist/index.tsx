import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // 引入 useRouter 进行页面跳转

interface User {
  id: number;
  userAccount: string;
  userName: string;
  userAvatar: string | null;
  userProfile: string | null;
  userRole: string;
}

const UserList: React.FC = () => {
  const router = useRouter(); // 使用 Next.js 的 useRouter 进行路由控制

  // 模拟的用户数据
  const [users, setUsers] = useState<User[]>([
    { id: 1, userAccount: 'user1', userName: 'John Doe', userAvatar: null, userProfile: 'Regular user', userRole: 'user' },
    { id: 2, userAccount: 'user2', userName: 'Jane Smith', userAvatar: null, userProfile: 'Regular user', userRole: 'user' },
    { id: 3, userAccount: 'user3', userName: 'Mike Johnson', userAvatar: null, userProfile: 'Regular user', userRole: 'user' },
  ]);

  // 检查用户角色是否为 admin
  useEffect(() => {
    const userRole = localStorage.getItem('userRole'); // 假设 userRole 存储在 localStorage
    if (userRole !== 'admin') {
      alert('You are not allowed to access this page!');
      router.push('/dashboard'); // 如果不是 admin，重定向到首页
    }
  }, [router]);

  // 删除用户
  const deleteUser = (userId: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  // 将用户角色从 user 更改为 admin
  const promoteToAdmin = (userId: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, userRole: 'admin' } : user
      )
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">User List</h1>
      <div className="space-y-4">
        {/* 表头 */}
        <div className="grid grid-cols-6 text-sm text-gray-500 mb-2">
          <div>USER ACCOUNT</div>
          <div>USER NAME</div>
          <div>USER AVATAR</div>
          <div>USER PROFILE</div>
          <div>USER ROLE</div>
          <div>ACTIONS</div>
        </div>

        {/* 用户列表 */}
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
              {user.userRole !== 'admin' && (
                 <button
                 className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
                 onClick={() => promoteToAdmin(user.id)}
               >
                 Promote
               </button>
              )}
              <button
                className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                onClick={() => deleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
