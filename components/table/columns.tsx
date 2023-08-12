'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from '@/components/table/cell-action';

export type BoardColumn = {
	id: string;
	label: string;
	createdAt: string;
};

export const columns: ColumnDef<BoardColumn>[] = [
	{
		accessorKey: 'label',
		header: 'Board',
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
