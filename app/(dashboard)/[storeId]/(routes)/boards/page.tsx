import { StoreBoardClient } from '@/components/board/board-client';
import type { BoardColumn } from '@/components/table/board-columns';
import prismadb from '@/lib/prismadb';

const StoreBoardsPage = async ({ params }: { params: { storeId: string } }) => {
	const boards = await prismadb.storeBoard.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: { createdAt: 'desc' },
	});
	const formattedData: BoardColumn[] = boards.map(
		({ id, label, createdAt }) => ({
			id,
			label,
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
				<StoreBoardClient data={formattedData} />
			</div>
		</div>
	);
};

export default StoreBoardsPage;
