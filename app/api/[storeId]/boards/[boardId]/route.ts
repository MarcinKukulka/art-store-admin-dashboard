import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
	req: Request,
	{ params }: { params: { boardId: string } }
) {
	try {
		const { boardId } = params;

		if (!boardId)
			return new NextResponse('Board id is required', { status: 400 });

		const board = await prismadb.store.findUnique({
			where: {
				id: boardId,
			},
		});

		return NextResponse.json(board);
	} catch (error) {
		console.log('[BOARD_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string; boardId: string } }
) {
	try {
		const { userId } = auth();
		const body = await req.json();

		const { label, imageUrl } = body;
		const { boardId, storeId } = params;

		if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

		if (!label) return new NextResponse('Label is required', { status: 400 });
		if (!imageUrl)
			return new NextResponse('Image url is required', { status: 400 });

		if (!boardId)
			return new NextResponse('Board id is required', { status: 400 });

		const storeByUserId = await prismadb.store.findFirst({
			where: { id: storeId, userId },
		});

		if (!storeByUserId)
			return new NextResponse('Unauthorized', { status: 403 });

		const board = await prismadb.storeBoard.updateMany({
			where: {
				id: boardId,
			},
			data: { label, imageUrl },
		});

		return NextResponse.json(board);
	} catch (error) {
		console.log('[BOARD_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { storeId: string; boardId: string } }
) {
	try {
		const { userId } = auth();

		const { storeId, boardId } = params;

		if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

		if (!boardId)
			return new NextResponse('Board id is required', { status: 400 });

		const storeByUserId = await prismadb.store.findFirst({
			where: { id: storeId, userId },
		});

		const board = await prismadb.store.deleteMany({
			where: {
				id: boardId,
			},
		});

		return NextResponse.json(board);
	} catch (error) {
		console.log('[BOARD_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
