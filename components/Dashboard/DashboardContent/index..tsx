import React from 'react';
import ShowUser from '@/components/ShowUser';
import Sidebar from '@/components/SideBar';
import UserList from '../Userlist';

const DashboardContent = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar 始终在左侧，固定宽度 */}
      <Sidebar />

      {/* 右侧内容区域 */}
      <div className="flex-grow ml-64"> {/* 确保内容区域有足够的空间 */}
        {/* Header 显示用户名 */}
        <header className="p-6 bg-blue-600 text-white flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <ShowUser /> {/* 用户名显示 */}
        </header>

        {/* 内容部分 */}
        <main className="flex-grow p-6 bg-gray-100 overflow-auto">
          <UserList /> {/* 用户列表 */}
        </main>
      </div>
    </div>
  );
};

export default DashboardContent;
