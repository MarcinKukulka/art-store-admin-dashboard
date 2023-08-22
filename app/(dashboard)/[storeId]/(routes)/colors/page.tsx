import { ColorClient } from '@/components/color-client';
import { ColorColumn } from '@/components/table/color-columns';
import prismadb from '@/lib/prismadb';

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
	const colors = await prismadb.color.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: { createdAt: 'desc' },
	});
	const formattedData: ColorColumn[] = colors.map(
		({ id, name, colorValue, createdAt }) => ({
			id,
			name,
			colorValue,
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
				<ColorClient data={formattedData} />
			</div>
		</div>
	);
};

export default ColorsPage;
