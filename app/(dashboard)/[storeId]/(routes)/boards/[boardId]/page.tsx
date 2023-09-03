import { BoardForm } from '@/components/board/board-form';
import prismadb from '@/lib/prismadb';

const BoardPage = async ({ params }: { params: { boardId: string } }) => {
	const board = await prismadb.storeBoard.findUnique({
		where: { id: params.boardId },
	});
	return <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <BoardForm initialData={board}/>
        </div>
    </div>;
};

export default BoardPage;
