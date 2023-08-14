'use client';

import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import { DataTable } from '@/components/table/data-tabel';
import { ApiList } from '@/components/ui/api-list';
import { CategoryColumn, CategoryColumns } from './table/category-columns';

type CategoriesClientProps = {
	data: CategoryColumn[];
};

export const CategoriesClient = ({ data }: CategoriesClientProps) => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Categories (${data.length})`}
					description="Manage categories of your store"
				/>
				<Button
					onClick={() => router.push(`/${params.storeId}/categories/add`)}
				>
					<Plus className="mr-2 h-4 w-4" />
					Add new
				</Button>
			</div>
			<Separator />
			<DataTable columns={CategoryColumns} data={data} filter="name" />
			<Heading title="API" description="Calls for categories" />
			<Separator />
			<ApiList subjectName="categories" subjectId="categoryId" />
		</>
	);
};
