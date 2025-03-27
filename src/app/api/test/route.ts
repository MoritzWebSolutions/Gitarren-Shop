import { NextResponse } from 'next/server';
import { prisma } from "@/src/lib/prisma";
import { ApiErrors } from "@/src/config/errors";

export async function GET() {
  try {
    const tests = await prisma.test.findMany();
    return NextResponse.json(tests, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : ApiErrors.UNBEKANNTER_FEHLER;
    console.error(errorMessage);
    return NextResponse.json({ error: ApiErrors.ABRUF_FEHLER }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newTest = await prisma.test.create({ data: body });
    return NextResponse.json(newTest, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : ApiErrors.UNBEKANNTER_FEHLER;
    console.error(errorMessage);
    return NextResponse.json({ error: ApiErrors.ERSTELL_FEHLER }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, ...inhalt } = await req.json();
    const updatedTest = await prisma.test.update({ where: { id }, inhalt });
    return NextResponse.json(updatedTest, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : ApiErrors.UNBEKANNTER_FEHLER;
    console.error(errorMessage);
    return NextResponse.json({ error: ApiErrors.UPDATE_FEHLER }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.test.delete({ where: { id } });
    return NextResponse.json({ message: "Test gelöscht" }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : ApiErrors.UNBEKANNTER_FEHLER;
    console.error(errorMessage);
    return NextResponse.json({ error: ApiErrors.LOESCH_FEHLER }, { status: 500 });
  }
}