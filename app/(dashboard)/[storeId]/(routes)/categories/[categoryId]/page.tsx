import { CategoryForm } from '@/components/category/category-form';
import prismadb from '@/lib/prismadb';

const CategoryPage = async ({
	params,
}: {
	params: { categoryId: string; storeId: string };
}) => {
	const category = await prismadb.category.findUnique({
		where: { id: params.categoryId },
	});

	const boards = await prismadb.storeBoard.findMany({
		where: { storeId: params.storeId },
	});
	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<CategoryForm boards={boards} initialData={category} />
			</div>
		</div>
	);
};

export default CategoryPage;
