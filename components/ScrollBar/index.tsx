import React from 'react';

const ScrollBar = () => {
    return (
        <div className="w-full text-center my-8">
            {/* 加粗标题 */}
            <h2 className="text-3xl font-bold mb-6">Most Trusted AI Chatbot and used by followed University</h2>
            <div className="overflow-hidden w-full">
                <div className="flex animate-scroll">
                    {/* Logo 1 */}
                    <div className="flex-shrink-0 px-8">
                        <img src="/princeton.png" alt="Princeton University" className="h-12"/>
                    </div>
                    {/* Logo 2 */}
                    <div className="flex-shrink-0 px-8">
                        <img src="/harvard.png" alt="Harvard University" className="h-12"/>
                    </div>
                    {/* Logo 3 */}
                    <div className="flex-shrink-0 px-8">
                        <img src="/northeastern.png" alt="Northeastern University" className="h-12"/>
                    </div>
                    {/* Logo 4 */}
                    <div className="flex-shrink-0 px-8">
                        <img src="/stanford.png" alt="Stanford University" className="h-12"/>
                    </div>
                    {/* Logo 5 */}
                    <div className="flex-shrink-0 px-8">
                        <img src="/oxford.png" alt="Oxford University" className="h-12"/>
                    </div>

                    <div className="flex-shrink-0 px-8">
                        <img src="/anu.png" alt="Oxford University" className="h-12"/>
                    </div>

                    <div className="flex-shrink-0 px-8">
                        <img src="/mel.png" alt="Oxford University" className="h-12"/>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default ScrollBar;
