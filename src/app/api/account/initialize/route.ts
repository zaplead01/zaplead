import { NextResponse } from "next/server";
import { AccountInitializeService } from "@/src/server/services/account-initialize.service";

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    const service = new AccountInitializeService();

    await service.initialize(userId);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
  console.error("========== INITIALIZE ERROR ==========");
  console.error(error);

  if (error instanceof Error) {
    console.error(error.message);
    console.error(error.stack);
  }

  return NextResponse.json(
    {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : JSON.stringify(error),
    },
    {
      status: 500,
    }
  );
}
}