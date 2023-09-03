import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
	req: Request,
	{ params }: { params: { productId: string } }
) {
	try {
		const { productId } = params;

		if (!productId)
			return new NextResponse('Product id is required', { status: 400 });

		const product = await prismadb.product.findUnique({
			where: {
				id: productId,
			},
			include: {
				images: true,
				category: true,
				color: true,
				size: true,
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log('[PRODUCT_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string; productId: string } }
) {
	try {
		const { userId } = auth();
		const body = await req.json();

		const {
			storeId,
			name,
			price,
			categoryId,
			sizeId,
			colorId,
			images,
			isFeatured,
			isArchived,
		} = body;
		const { productId } = params;

		if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

		if (!name) return new NextResponse('Label is required', { status: 400 });
		if (!price) return new NextResponse('Price is required', { status: 400 });
		if (!categoryId)
			return new NextResponse('Category id is required', { status: 400 });
		if (!colorId)
			return new NextResponse('Color id is required', { status: 400 });
		if (!sizeId)
			return new NextResponse('Size id is required', { status: 400 });
		if (!images || !images.length)
			return new NextResponse('Images are required', { status: 400 });

		if (!productId)
			return new NextResponse('Product id is required', { status: 400 });

		const storeByUserId = await prismadb.store.findFirst({
			where: { id: storeId, userId },
		});

		if (!storeByUserId)
			return new NextResponse('Unauthorized', { status: 403 });

		await prismadb.product.update({
			where: {
				id: productId,
			},
			data: {
				name,
				price,
				categoryId,
				sizeId,
				colorId,
				isArchived,
				isFeatured,
				images: { deleteMany: {} },
			},
		});

		const product = await prismadb.product.update({
			where: {
				id: productId,
			},
			data: {
				images: {
					createMany: {
						data: [...images.map((image: { url: string }) => image)],
					},
				},
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log('[PRODUCT_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { storeId: string; productId: string } }
) {
	try {
		const { userId } = auth();

		const { storeId, productId } = params;

		if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

		if (!productId)
			return new NextResponse('Product id is required', { status: 400 });

		const storeByUserId = await prismadb.store.findFirst({
			where: { id: storeId, userId },
		});

		if (!storeByUserId)
			return new NextResponse('Unauthorized', { status: 405 });

		const product = await prismadb.product.delete({
			where: {
				id: productId,
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log('[PRODUCT_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
