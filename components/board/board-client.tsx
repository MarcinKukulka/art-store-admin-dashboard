'use client';

import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import { DataTable } from '@/components/table/data-tabel';
import { BoardColumn, BoardColumns } from '@/components/table/board-columns';
import { ApiList } from '@/components/ui/api-list';
import { CategoryColumn } from '../table/category-columns';

type StoreBoardClientProps = {
	data: BoardColumn[];
};

export const StoreBoardClient = ({ data }: StoreBoardClientProps) => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Store boards (${data.length})`}
					description="Manage boards of your store"
				/>
				<Button onClick={() => router.push(`/${params.storeId}/boards/add`)}>
					<Plus className="mr-2 h-4 w-4" />
					Add new
				</Button>
			</div>
			<Separator />
			<DataTable columns={BoardColumns} data={data} filter="label" />
			<Heading title="API" description="Calls for boards" />
			<Separator />
			<ApiList subjectName="boards" subjectId="boardId" />
		</>
	);
};
