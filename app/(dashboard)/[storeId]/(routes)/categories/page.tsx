import { CategoriesClient } from '@/components/categories-client';
import type { CategoryColumn } from '@/components/table/category-columns';
import prismadb from '@/lib/prismadb';

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
	const categories = await prismadb.category.findMany({
		where: {
			storeId: params.storeId,
		},
		include: { board: true },
		orderBy: { createdAt: 'desc' },
	});
	const formattedData: CategoryColumn[] = categories.map(
		({ id, name, board, createdAt }) => ({
			id,
			name,
			boardLabel: board.label,
			createdAt: Intl.DateTimeFormat('pl-PL', {
				year: 'numeric',
				month: 'numeric',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
			}).format(createdAt),
		})
	);

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<CategoriesClient data={formattedData} />
			</div>
		</div>
	);
};

export default CategoriesPage;
