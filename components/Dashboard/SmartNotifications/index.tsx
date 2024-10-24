import React from 'react'
import ShowUser from '@/components/ShowUser'
import Sidebar from '@/components/SideBar'

const Smartnotifiy = () => {
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
        <div className="p-4">
          <h1 className="text-2xl font-bold">smart Content</h1>
          <p>123455643663</p>
        </div>
      </div>
    </div>
  )
}

export default Smartnotifiy