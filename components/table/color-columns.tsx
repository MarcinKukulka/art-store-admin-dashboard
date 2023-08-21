'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from '@/components/table/cell-action';

export type ColorColumn = {
	id: string;
	name: string;
	colorValue: string;
	createdAt: string;
};

export const ColorColumns: ColumnDef<ColorColumn>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'colorValue',
		header: 'Value',
		cell: ({ row }) => (
			<div className="flex items-center gap-x-2">
				{row.original.colorValue}
				<div
					className="h-6 w-6 rounded-full border"
					style={{ backgroundColor: row.original.colorValue }}
				/>
			</div>
		),
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
