import Link from 'next/link';

const Home= () => {
    return (
        <div className="container mx-auto px-4">
            {/* Header */}
            <header className="flex justify-between items-center py-4">
                <div className="text-2xl font-bold">Smart Daily Management Assistant</div>
                <nav>
                    <ul className="flex space-x-4 text-sm text-blue-600">
                        <li><Link href="/login">login</Link></li>
                        <li><Link href="/register">register</Link></li>
                        
                    </ul>
                </nav>
            </header>
            <hr className='bg-gray-200 w-auto mx-auto'/>
            {/* Main Section */}
            <main className="flex mt-12">
                {/* Left Section */}
                <div className="w-1/2 pr-8">
                    <h1 className="text-6xl font-bold mb-4">
                        <span className="text-blue-600">Daily Chatbot</span>
                        <span className="text-purple-600">AI</span>
                    </h1>
                    <h2 className="text-2xl font-bold mb-4">Strongest AI in usyd </h2>
                    <p className="text-lg mb-6">
                        Easy talk, use  AI for Smart Notifications, Automatic Meal and Diet Planning, Mood-Based Music Recommendations,Automatic Time Management
                    </p>
                    <Link href="/register">
                <button className="bg-blue-100 text-blue-700 px-6 py-3 rounded-full text-sm font-medium">
                    Talk with our AI
                </button>
            </Link>
                </div>
                

                {/* Right Section with Image */}
                <div className="w-1/2">
                    <div className="relative">
                        <img 
                            src="/usyd.png" 
                            alt="bg"
                            className="rounded-lg w-full"
                        />
                        <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-md">
                            <h3 className="text-sm font-medium mb-2">
                                <i className="fas fa-gem text-red-500 mr-2"></i>
                                Problem we may meet：
                            </h3>
                            <ul className="text-sm">
                                <li>- need a system that assists in managing your time and daily task？</li>
                                <li>- ask for personalized Health Recommendations</li>
                                <li>- try user Behavior Analysis</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                
            </main>
            
        </div>
    );
};

export default Home;
