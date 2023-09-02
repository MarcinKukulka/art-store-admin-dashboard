import { ProductClient } from '@/components/product-client';
import type { ProductColumn } from '@/components/table/products-columns';
import prismadb from '@/lib/prismadb';
import { formatter } from '@/lib/utils';

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
	const products = await prismadb.product.findMany({
		where: {
			storeId: params.storeId,
		},
		include: {
			category: true,
			size: true,
			color: true,
		},
		orderBy: { createdAt: 'desc' },
	});
	const formattedData: ProductColumn[] = products.map(
		({
			id,
			createdAt,
			name,
			color,
			size,
			category,
			isArchived,
			isFeatured,
			price,
		}) => ({
			id,
			createdAt: Intl.DateTimeFormat('pl-PL', {
				year: 'numeric',
				month: 'numeric',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
			}).format(createdAt),
			name,
			color: color.value,
			category: category.name,
			isArchived,
			size: size.name,
			isFeatured,
			price: formatter.format(price.toNumber()),
		})
	);

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<ProductClient data={formattedData} />
			</div>
		</div>
	);
};

export default ProductsPage;
