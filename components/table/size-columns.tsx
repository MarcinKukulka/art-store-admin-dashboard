'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from '@/components/table/cell-action';

export type SizeColumn = {
	id: string;
	name: string;
	value: string;
	createdAt: string;
};

export const SizeColumns: ColumnDef<SizeColumn>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'value',
		header: 'Value',
	},
	{
		accessorKey: 'createdAt',
		header: 'Creation date',
	},
	{
		id: 'actions',
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
