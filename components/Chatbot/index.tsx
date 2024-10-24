"use client";
import { useState } from "react";

export default function Chatbot() {
  const [theInput, setTheInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Yo, this is Smart Personal Assistant! How can I help you today?",
    },
  ]);

  const callGetResponse = async () => {
    setIsLoading(true);
    let temp = messages;
    temp.push({ role: "user", content: theInput });
    setMessages(temp);
    setTheInput("");
    console.log("Calling OpenAI...");

    const response = await fetch("/api/chat", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.content);

    setMessages((prevMessages) => [...prevMessages, output]);
    setIsLoading(false);
  };

  const Submit = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      callGetResponse();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 flex flex-col items-center justify-center py-5 px-5"> {/* 调整背景和布局 */}
      <h1 className="text-5xl font-sans mb-10">Smart Personal Assistant</h1>

      <div className="flex h-[35rem] w-[40rem] flex-col items-center bg-white bg-opacity-20 backdrop-blur-md rounded-xl shadow-lg"> {/* 调整卡片样式 */}
        <div className="flex-1 w-full flex flex-col gap-2 overflow-y-auto py-8 px-3">
          {messages.map((e) => {
            return (
              <div
                key={e.content}
                className={`w-max max-w-[18rem] rounded-md px-4 py-3 h-min shadow-md ${
                  e.role === "assistant"
                    ? "self-start bg-gray-200 text-gray-800"
                    : "self-end bg-gray-800 text-white"
                }`}
              >
                {e.content}
              </div>
            );
          })}

          {isLoading && (
            <div className="self-start bg-gray-200 text-gray-800 w-max max-w-[18rem] rounded-md px-4 py-3 h-min">
              *thinking*
            </div>
          )}
        </div>

        <div className="relative w-[90%] bottom-4 flex justify-center mt-4">
          <textarea
            value={theInput}
            onChange={(event) => setTheInput(event.target.value)}
            className="w-[85%] h-12 px-4 py-2 resize-none overflow-y-auto text-black bg-gray-300 rounded-l-lg outline-none shadow-md"
            onKeyDown={Submit}
          />
          <button
            onClick={callGetResponse}
            className="w-[15%] bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300 shadow-md"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
