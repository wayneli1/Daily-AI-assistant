// app/api/chat/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

// 初始化 OpenAI 客户端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 默认导出处理 POST 请求的函数
export async function POST(req: Request) {
  try {
    // 获取请求体
    const body = await req.json();

    // 调用 OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: body.messages,
    });

    // 提取 AI 的回复
    const theResponse = completion.choices[0].message;

    // 返回 AI 回复
    return NextResponse.json({ output: theResponse }, { status: 200 });
  } catch (error) {
    console.error('Error with OpenAI API:', error);

    // 返回错误信息
    return NextResponse.json({ error: 'Failed to fetch data from OpenAI' }, { status: 500 });
  }
}
