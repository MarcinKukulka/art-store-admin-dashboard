'use client';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/table/data-tabel';
import { OrderColumn, OrderColumns } from '../table/order-column';

type OrderClientProps = {
	data: OrderColumn[];
};

export const OrderClient = ({ data }: OrderClientProps) => {
	return (
		<>
			<Heading
				title={`Orders (${data.length})`}
				description="Manage orders"
			/>

			<Separator />
			<DataTable columns={OrderColumns} data={data} filter="products" />
		</>
	);
};
