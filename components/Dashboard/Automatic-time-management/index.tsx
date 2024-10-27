import React from 'react';
import Sidebar from '@/components/SideBar';
import ShowUser from '@/components/ShowUser'; 
import AutomaticTimeManage from '@/components/AutomaticTimeManage';

const AutomaticTimeManagement = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar 保持不变 */}
      <Sidebar />

      {/* 右侧内容区域 */}
      <div className="flex-grow">
        {/* Header 显示用户名 */}
        <header>
          <ShowUser />
        </header>

        {/* 内容部分 */}
        <div>
          <AutomaticTimeManage />
        </div>
      </div>
    </div>
  );
};

export default AutomaticTimeManagement;
