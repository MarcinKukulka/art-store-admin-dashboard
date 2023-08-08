import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { userId } = auth();
		const body = await req.json();

		const { label, imageUrl } = body;
		const { storeId } = params;

		if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

		if (!label) return new NextResponse('Label is required', { status: 400 });
		if (!imageUrl)
			return new NextResponse('Image url is required', { status: 400 });

		if (!storeId)
			return new NextResponse('Store id is required', { status: 400 });

		const storeByUserId = await prismadb.store.findFirst({
			where: { id: storeId, userId },
		});

		if (!storeByUserId)
			return new NextResponse('Unauthorized', { status: 403 });

		const board = await prismadb.storeBoard.create({
			data: {
				label,
				imageUrl,
				storeId,
			},
		});

		return NextResponse.json(board);
	} catch (error) {
		console.log('[BOARD_POST]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function GET(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { storeId } = params;

		if (!storeId)
			return new NextResponse('Store id is required', { status: 400 });

		const boards = await prismadb.storeBoard.findMany({
			where: { storeId },
		});

		return NextResponse.json(boards);
	} catch (error) {
		console.log('[BOARDS_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
