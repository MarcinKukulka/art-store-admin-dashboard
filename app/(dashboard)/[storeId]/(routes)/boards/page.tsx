import { StoreBoardClient } from '@/components/board-client';

const StoreBoardsPage = () => {
	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<StoreBoardClient />
			</div>
		</div>
	);
};

export default StoreBoardsPage;
