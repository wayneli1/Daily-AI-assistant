import React, { useEffect, useState } from 'react';

interface Notification {
  title: string;
  content: string;
  startTime: string;
  endTime: string;
  icon: string;
  color: string;
}

const ShowNotify: React.FC = () => {
  const notifications: Notification[] = [
    {
      title: "New Registration: Finibus Bonorum et Malorum",
      content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
      startTime: "24 Nov 2024 at 9:30 AM",
      endTime: "24 Nov 2024 at 10:30 AM",
      icon: "fas fa-user-plus",
      color: "bg-green-500",
    },
    {
      title: "Darren Smith sent new message",
      content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
      startTime: "24 Nov 2024 at 9:30 AM",
      endTime: "24 Nov 2024 at 11:00 AM",
      icon: "fas fa-envelope",
      color: "bg-blue-500",
    },
    {
      title: "Arin Gansihram Commented on post",
      content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
      startTime: "24 Nov 2024 at 10:00 AM",
      endTime: "24 Nov 2024 at 11:30 AM",
      icon: "fas fa-comment",
      color: "bg-purple-500",
    },
  ];

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkNotifications = () => {
      const now = new Date();

      notifications.forEach((notification) => {
        const startTime = new Date(notification.startTime);

        // 检查通知的 startTime 是否与当前时间接近
        if (Math.abs(startTime.getTime() - now.getTime()) < 1000) {
          setToastMessage(`Reminder: ${notification.title} is starting now!`);
        }
      });
    };

    const intervalId = setInterval(checkNotifications, 1000); // 每秒检查一次

    return () => clearInterval(intervalId); // 清除定时器，避免内存泄漏
  }, [notifications]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Notifications
      </h1>
      {notifications.map((notification, index) => (
        <div 
          key={index} 
          className="bg-white p-6 rounded-xl shadow-md transition duration-300 card-hover border border-gray-100"
        >
          <div className="flex items-start space-x-4">
            <div className={`${notification.color} p-3 rounded-full text-white`}>
              <i className={`${notification.icon} text-lg`}></i>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {notification.title}
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {notification.content}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center text-gray-500">
                  <i className="far fa-clock mr-2"></i>
                  <span>Start: {notification.startTime}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <i className="far fa-clock mr-2"></i>
                  <span>End: {notification.endTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {toastMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-2 px-4 rounded shadow-lg">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default ShowNotify;
