import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
	req: Request,
	{ params }: { params: { colorId: string } }
) {
	try {
		const { colorId } = params;

		if (!colorId)
			return new NextResponse('Size id is required', { status: 400 });

		const color = await prismadb.color.findUnique({
			where: {
				id: colorId,
			},
		});

		return NextResponse.json(color);
	} catch (error) {
		console.log('[COLOR_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string; colorId: string } }
) {
	try {
		const { userId } = auth();
		const body = await req.json();

		const { name, colorValue } = body;
		const { colorId, storeId } = params;

		if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

		if (!name) return new NextResponse('Name is required', { status: 400 });
		if (!colorValue)
			return new NextResponse('Value is required', { status: 400 });

		if (!colorId)
			return new NextResponse('Color id is required', { status: 400 });

		const storeByUserId = await prismadb.store.findFirst({
			where: { id: storeId, userId },
		});

		if (!storeByUserId)
			return new NextResponse('Unauthorized', { status: 403 });

		const color = await prismadb.color.updateMany({
			where: {
				id: colorId,
			},
			data: { name, colorValue },
		});

		return NextResponse.json(color);
	} catch (error) {
		console.log('[COLOR_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { storeId: string; colorId: string } }
) {
	try {
		const { userId } = auth();

		const { storeId, colorId } = params;

		if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

		if (!colorId)
			return new NextResponse('Color id is required', { status: 400 });

		const storeByUserId = await prismadb.store.findFirst({
			where: { id: storeId, userId },
		});

		if (!storeByUserId)
			return new NextResponse('Unauthorized', { status: 405 });

		const color = await prismadb.color.delete({
			where: {
				id: colorId,
			},
		});

		return NextResponse.json(color);
	} catch (error) {
		console.log('[COLOR_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
