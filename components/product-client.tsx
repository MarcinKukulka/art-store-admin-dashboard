'use client';

import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import { DataTable } from '@/components/table/data-tabel';
import { ApiList } from '@/components/ui/api-list';
import { ProductColumn, ProductColumns } from '@/components/table/products-columns';

type ProductClientProps = {
	data: ProductColumn[]
};

export const ProductClient = ({ data }: ProductClientProps) => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Products (${data.length})`}
					description="Manage boards of your store"
				/>
				<Button onClick={() => router.push(`/${params.storeId}/products/add`)}>
					<Plus className="mr-2 h-4 w-4" />
					Add new
				</Button>
			</div>
			<Separator />
			<DataTable columns={ProductColumns} data={data} filter="label" />
			<Heading title="API" description="Calls for products" />
			<Separator />
			<ApiList subjectName="products" subjectId="productId" />
		</>
	);
};
