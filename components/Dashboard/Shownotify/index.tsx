import React from 'react';

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
      startTime: "24 Nov 2018 at 9:30 AM",
      endTime: "24 Nov 2018 at 9:30 AM",
      icon: "fas fa-user-plus",
      color: "bg-green-500",
    },
    {
      title: "Darren Smith sent new message",
      content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
      startTime: "24 Nov 2018 at 9:30 AM",
      endTime: "24 Nov 2018 at 9:30 AM",
      icon: "fas fa-envelope",
      color: "bg-blue-500",
    },
    {
      title: "Arin Gansihram Commented on post",
      content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
      startTime: "24 Nov 2018 at 9:30 AM",
      endTime: "24 Nov 2018 at 9:30 AM",
      icon: "fas fa-comment",
      color: "bg-purple-500",
    },
  ];

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
    </div>
  );
};

export default ShowNotify;
