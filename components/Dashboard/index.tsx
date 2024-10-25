import React, { useRef } from 'react';
import Sidebar from '@/components/SideBar';
import ShowUser from '@/components/ShowUser';

const Dashboard = () => {
  // 创建 ref 来引用目标 div，并指定它的类型是 HTMLDivElement 或 null
  const detailsSectionRef = useRef<HTMLDivElement>(null);

  // 点击按钮时滚动到目标 div
  const scrollToDetails = () => {
    if (detailsSectionRef.current) {
      detailsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex"> {/* 使用 flex 布局 */}
      {/* Sidebar 始终在左侧 */}
      <Sidebar />

      {/* 右侧内容区域 */}
      <div className="flex-grow ml-64"> {/* 使用 ml-64 确保内容从侧边栏右侧开始 */}
        {/* Header 显示用户名 */}
        <header>
          <ShowUser />
        </header>

        {/* Hero Section */}
        <div className="relative h-screen">
          <div className="absolute inset-0">
            <img 
              src="./robot2.png" 
              alt="A smiling Asian student in a blue jacket reading from a notebook while standing against a brick wall background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>
          
          <div className="relative z-10 px-20 pt-40">
            <p className="text-white text-lg mb-2">EDUCATION & Daily</p>
            <h1 className="text-white text-6xl font-bold leading-tight mb-6">
              Our AI change the world,<br/>
              Make Your Daily Better!
            </h1>
            <p className="text-white text-lg mb-8 max-w-xl">
              Get creative inspiration and improve work efficiency.
              Have a casual conversation and let our AI help you analyze, plan, study, or do other things.
            </p>
            <button 
              className="bg-red-300 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:text-white shadow-white transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce"
              onClick={scrollToDetails} // 调用滚动函数
            >
              Look details
            </button>
          </div>
        </div>

        {/* Teaching Approach Section */}
        <div className="bg-[#FDF8F5] py-20" ref={detailsSectionRef}>
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 gap-20">
            <div className="w-full">
              <img 
                src="./meal.png" 
                alt="A professional teacher with blonde hair wearing a white shirt, smiling warmly in an educational setting"
                className="rounded-lg w-full"
              />
            </div>
            <div className="w-full pt-10">
              <h2 className="text-4xl font-bold text-[#1B2534] mb-8">
              Automatic Meal and Diet Planning<br/>
                
              </h2>
              <p className="text-gray-600 mb-6">
              Struggling to figure out the perfect meal plan? Let us take the guesswork out of your diet! Get personalized meal suggestions that align with your body’s unique data and needs.

              </p>
              <p className="text-gray-600 mb-8">
              With just a click, generate a tailored Body Data Report and receive diet plans that not only boost your health but also suit your lifestyle. Eat smarter, live better!

              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#FDF8F5] py-20" >
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 gap-20">
            <div className="w-full">
              <img 
                src="./smart.png" 
                alt="A professional teacher with blonde hair wearing a white shirt, smiling warmly in an educational setting"
                className="rounded-lg w-full"
              />
            </div>
            <div className="w-full pt-10">
              <h2 className="text-4xl font-bold text-[#1B2534] mb-8">
              Smart Notifications<br/>
                
              </h2>
              <p className="text-gray-600 mb-6">
              Never miss an important update! Our Smart Notifications keep you on track with personalized reminders tailored to your schedule and goals.

              </p>
              <p className="text-gray-600 mb-8">
              From health insights to daily task reminders, get timely nudges that help you stay productive and focused. Let our AI handle the details so you can focus on what matters most!

              </p>
            </div>
          </div>
        </div>


        <div className="bg-[#FDF8F5] py-20" >
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 gap-20">
            <div className="w-full">
              <img 
                src="./music.png" 
                alt="A professional teacher with blonde hair wearing a white shirt, smiling warmly in an educational setting"
                className="rounded-lg w-full"
              />
            </div>
            <div className="w-full pt-10">
              <h2 className="text-4xl font-bold text-[#1B2534] mb-8">
              Mood-Based Music Recommendations<br/>
                
              </h2>
              <p className="text-gray-600 mb-6">
              Feeling happy, sad, or stressed? Let your mood dictate the playlist! Our AI curates personalized music recommendations that fit your emotions, helping you relax, focus, or just enjoy the moment.

              </p>
              <p className="text-gray-600 mb-8">
              Whether you need energetic beats to keep you motivated or calming tunes to wind down, just select your mood, and we’ll handle the rest. Your perfect playlist is just a click away!

              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#FDF8F5] py-20" >
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 gap-20">
            <div className="w-full">
              <img 
                src="./health.png" 
                alt="A professional teacher with blonde hair wearing a white shirt, smiling warmly in an educational setting"
                className="rounded-lg w-full"
              />
            </div>
            <div className="w-full pt-10">
              <h2 className="text-4xl font-bold text-[#1B2534] mb-8">
                Intelligent Health Monitoring<br/>
              </h2>
              <p className="text-gray-600 mb-6">
              Stay ahead of your health with real-time monitoring and insights. Our intelligent system tracks your vital signs, activity levels, and sleep patterns to provide you with actionable feedback.

              </p>
              <p className="text-gray-600 mb-8">
              Get timely health reports and recommendations, so you can make informed decisions for a healthier lifestyle. It's like having a personal health assistant by your side, 24/7.

              </p>
            </div>
          </div>
        </div>


        <div className="bg-[#FDF8F5] py-20" >
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 gap-20">
            <div className="w-full">
              <img 
                src="./health2.png" 
                alt="A professional teacher with blonde hair wearing a white shirt, smiling warmly in an educational setting"
                className="rounded-lg w-full"
              />
            </div>
            <div className="w-full pt-10">
              <h2 className="text-4xl font-bold text-[#1B2534] mb-8">
              Proactive Health Insights<br/>
                
              </h2>
              <p className="text-gray-600 mb-6">
              Don’t wait for a problem to arise. With our Proactive Health Insights, get ahead of potential health issues with early warnings and personalized tips to keep you feeling your best.

              </p>
              <p className="text-gray-600 mb-8">
              Our AI analyzes your body data to offer tailored health advice that helps you stay proactive. Prevent, rather than cure—because your health deserves the best care.

              </p>
            </div>
          </div>
        </div>


        <div className="bg-[#FDF8F5] py-20" >
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 gap-20">
            <div className="w-full">
              <img 
                src="./chatbot.png" 
                alt="A professional teacher with blonde hair wearing a white shirt, smiling warmly in an educational setting"
                className="rounded-lg w-full"
              />
            </div>
            <div className="w-full pt-10">
              <h2 className="text-4xl font-bold text-[#1B2534] mb-8">
              AI Chatbot<br/>
                
              </h2>
              <p className="text-gray-600 mb-6">
              Have a question? Need advice? Our AI Chatbot is here to assist you 24/7. Whether it’s a casual conversation, a health query, or help with your daily tasks, our chatbot is always ready to help.

              </p>
              <p className="text-gray-600 mb-8">
              With smart conversational abilities, the AI Chatbot can analyze, plan, and offer insights based on your specific needs. Get instant support anytime, anywhere!

              </p>
            </div>
          </div>
        </div>


        <div className="bg-[#FDF8F5] py-20" >
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 gap-20">
            <div className="w-full">
              <img 
                src="./time.png" 
                alt="A professional teacher with blonde hair wearing a white shirt, smiling warmly in an educational setting"
                className="rounded-lg w-full"
              />
            </div>
            <div className="w-full pt-10">
              <h2 className="text-4xl font-bold text-[#1B2534] mb-8">
              Automatic Time Management<br/>
                
              </h2>
              <p className="text-gray-600 mb-6">
              Struggling to stay on top of your daily tasks? Let our Automatic Time Management feature optimize your schedule for maximum productivity. It intelligently organizes your day so you can focus on what matters most.

              </p>
              <p className="text-gray-600 mb-8">
              From setting priorities to managing reminders, our AI ensures you never miss a deadline. Achieve more in less time with personalized task scheduling that fits your unique needs.

              </p>
            </div>
          </div>
        </div>


        {/* 你可以重复其他 section */}
      </div>
    </div>
  );
};

export default Dashboard;
