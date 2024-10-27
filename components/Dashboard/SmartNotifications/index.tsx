import React from 'react';
import Sidebar from '@/components/SideBar';
import ShowUser from '@/components/ShowUser'; // 导入 ShowUser 组件
import ShowNotify from '../Shownotify';

const index = () => {
  return (
    <div className="flex h-screen"> {/* 使用 flex 布局 */}
      
      {/* Sidebar 始终在左侧 */}
      <Sidebar />

      {/* 右侧内容区域 */}
      <div className="flex-grow">
        {/* Header 显示用户名 */}
        <header >
          <ShowUser />
        </header>

        {/* 内容部分 */}
        <div >
          <ShowNotify/>
          
        </div>
      </div>
    </div>
  );
};

export default index;
