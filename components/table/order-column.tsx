'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from '@/components/table/cell-action';

export type OrderColumn = {
	id: string;
	phone: string;
	address: string;
	isPaid: boolean;
	totalPrice: string;
	products: string;
	createdAt: string;
};

export const OrderColumns: ColumnDef<OrderColumn>[] = [
	{
		accessorKey: 'products',
		header: 'Products',
	},
	{
		accessorKey: 'phone',
		header: 'Phone',
	},
	{
		accessorKey: 'address',
		header: 'Address',
	},
	{
		accessorKey: 'totalPrice',
		header: 'Total price',
	},
	{
		accessorKey: 'isPaid',
		header: 'Paid',
	},
	{
		accessorKey: 'createdAt',
		header: 'Creation date',
	},
];
