'use client';

import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import { DataTable } from '@/components/table/data-tabel';
import { ApiList } from '@/components/ui/api-list';
import { SizeColumn, SizeColumns } from '@/components/table/size-columns';

type SizeClientProps = {
	data: SizeColumn[]
};

export const SizeClient = ({ data }: SizeClientProps) => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Sizes (${data.length})`}
					description="Manage sizes of your store"
				/>
				<Button onClick={() => router.push(`/${params.storeId}/sizes/add`)}>
					<Plus className="mr-2 h-4 w-4" />
					Add new
				</Button>
			</div>
			<Separator />
			<DataTable columns={SizeColumns} data={data} filter="name" />
			<Heading title="API" description="Calls for sizes" />
			<Separator />
			<ApiList subjectName="sizes" subjectId="sizeId" />
		</>
	);
};
