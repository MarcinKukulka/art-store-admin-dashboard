import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { Bilbo } from 'next/font/google';
import { NextResponse } from 'next/server';

export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { userId } = auth();
		const body = await req.json();

		const { name, boardId } = body;
		const { storeId } = params;

		if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

		if (!name) return new NextResponse('Name is required', { status: 400 });
		if (!boardId)
			return new NextResponse('Board id is required', { status: 400 });

		if (!storeId)
			return new NextResponse('Store id is required', { status: 400 });

		const storeByUserId = await prismadb.store.findFirst({
			where: { id: storeId, userId },
		});

		if (!storeByUserId)
			return new NextResponse('Unauthorized', { status: 403 });

		const category = await prismadb.category.create({
			data: {
				name,
				boardId,
				storeId,
			},
		});

		return NextResponse.json(category);
	} catch (error) {
		console.log('[CATEGORY_POST]', error);
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

		const categories = await prismadb.category.findMany({
			where: { storeId },
		});

		return NextResponse.json(categories);
	} catch (error) {
		console.log('[CATEGORY_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
