import { NextRequest, NextResponse } from "next/server";
import { ContactForm } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: ContactForm = await request.json();

    // 유효성 검사
    const errors: Record<string, string> = {};

    if (!body.name?.trim()) {
      errors.name = "이름을 입력해주세요";
    }

    if (!body.email?.trim()) {
      errors.email = "이메일을 입력해주세요";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      errors.email = "올바른 이메일 형식이 아닙니다";
    }

    if (!body.subject?.trim()) {
      errors.subject = "제목을 입력해주세요";
    }

    if (!body.message?.trim()) {
      errors.message = "메시지를 입력해주세요";
    } else if (body.message.length < 10) {
      errors.message = "메시지는 10자 이상 입력해주세요";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // TODO: 실제 이메일 전송 로직 추가
    // 옵션 1: Supabase Edge Functions + Resend
    // 옵션 2: SendGrid API
    // 옵션 3: Nodemailer + SMTP

    // 현재는 더미 응답 (나중에 실제 이메일 서비스 연동)
    console.log("Contact form submission:", {
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
      timestamp: new Date().toISOString(),
    });

    // TODO: Supabase에 문의 내역 저장
    // const supabase = createClient()
    // await supabase.from('contacts').insert({
    //   name: body.name,
    //   email: body.email,
    //   subject: body.subject,
    //   message: body.message,
    // })

    return NextResponse.json({
      success: true,
      message: "메시지가 성공적으로 전송되었습니다.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      },
      { status: 500 },
    );
  }
}
