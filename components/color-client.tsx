'use client';

import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import { DataTable } from '@/components/table/data-tabel';
import { ApiList } from '@/components/ui/api-list';
import { ColorColumn, ColorColumns } from '@/components/table/color-columns';

type ColorClientProps = {
	data: ColorColumn[]
};

export const ColorClient = ({ data }: ColorClientProps) => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Colors (${data.length})`}
					description="Manage colors of your store"
				/>
				<Button onClick={() => router.push(`/${params.storeId}/colors/add`)}>
					<Plus className="mr-2 h-4 w-4" />
					Add new
				</Button>
			</div>
			<Separator />
			<DataTable columns={ColorColumns} data={data} filter="name" />
			<Heading title="API" description="Calls for colors" />
			<Separator />
			<ApiList subjectName="colors" subjectId="colorId" />
		</>
	);
};
