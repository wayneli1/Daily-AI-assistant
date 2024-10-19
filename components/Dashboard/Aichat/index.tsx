import React from 'react';
import Sidebar from '@/components/SideBar';
import ShowUser from '@/components/ShowUser'; // 导入 ShowUser 组件

const Aichat = () => {
  return (
    <div className="flex h-screen"> {/* 使用 flex 布局 */}
      
      {/* Sidebar 始终在左侧 */}
      <Sidebar />

      {/* 右侧内容区域 */}
      <div className="flex-grow">
        {/* Header 显示用户名 */}
        <header className="flex justify-between p-4 bg-gray-800 text-white">
          <ShowUser />
        </header>

        {/* 内容部分 */}
        <div className="p-4">
          <h1 className="text-2xl font-bold">Ai chat</h1>
          <p>chat</p>
        </div>
      </div>
    </div>
  );
};

export default Aichat;
