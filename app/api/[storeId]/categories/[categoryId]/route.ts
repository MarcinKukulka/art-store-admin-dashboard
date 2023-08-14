import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
	req: Request,
	{ params }: { params: { categoryId: string } }
) {
	try {
		const { categoryId } = params;

		if (!categoryId)
			return new NextResponse('Category id is required', { status: 400 });

		const category = await prismadb.category.findUnique({
			where: {
				id: categoryId,
			},
		});

		return NextResponse.json(category);
	} catch (error) {
		console.log('[CATEGORY_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string; categoryId: string } }
) {
	try {
		const { userId } = auth();
		const body = await req.json();

		const { name, boardId } = body;
		const { categoryId, storeId } = params;

		if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

		if (!name) return new NextResponse('Name is required', { status: 400 });
		if (!boardId)
			return new NextResponse('Board id url is required', { status: 400 });

		if (!categoryId)
			return new NextResponse('Category id is required', { status: 400 });

		const storeByUserId = await prismadb.store.findFirst({
			where: { id: storeId, userId },
		});

		if (!storeByUserId)
			return new NextResponse('Unauthorized', { status: 403 });

		const category = await prismadb.category.updateMany({
			where: {
				id: categoryId,
			},
			data: { name, boardId },
		});

		return NextResponse.json(category);
	} catch (error) {
		console.log('[CATEGORY_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { storeId: string; categoryId: string } }
) {
	try {
		const { userId } = auth();

		const { storeId, categoryId } = params;

		if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

		if (!categoryId)
			return new NextResponse('Category id is required', { status: 400 });

		const storeByUserId = await prismadb.store.findFirst({
			where: { id: storeId, userId },
		});

		if (!storeByUserId)
			return new NextResponse('Unauthorized', { status: 405 });

		const category = await prismadb.category.delete({
			where: {
				id: categoryId,
			},
		});

		return NextResponse.json(category);
	} catch (error) {
		console.log('[CATEGORY_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
