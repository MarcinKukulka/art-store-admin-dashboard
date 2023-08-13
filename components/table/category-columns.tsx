'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from '@/components/table/cell-action';

export type CategoryColumn = {
	id: string;
	name: string;
	boardLabel: string;
	createdAt: string;
};

export const CategoryColumns: ColumnDef<CategoryColumn>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'board',
		header: 'Board',
		cell: ({ row }) => row.original.boardLabel,
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
