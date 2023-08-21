'use client';

import { BoardColumn } from '@/components/table/board-columns';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { AlertModal } from '@/components/modals/alert-modal';
import type { CategoryColumn } from '@/components/table/category-columns';
import type { SizeColumn } from '@/components/table/size-columns';
import type { ColorColumn } from '@/components/table/color-columns';

type CellActionProps = {
	data: BoardColumn | CategoryColumn | SizeColumn | ColorColumn;
};


export const CellAction = ({ data }: CellActionProps) => {
	const router = useRouter();
	const params = useParams();
	const { storeId } = params;
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	// const toastKind = () => {
	// 	if('label' in data) return 'Board';
	// 	if('category' in data) return 'Category';
	// 	if('value' in data) return 'Size';
	// }
	// const routesKind = () => {
	// 	if('label' in data) return 'boards';
	// 	if('category' in data) return 'categories';
	// 	if('value' in data) return 'sizes';
	// }
	// const toastKind = (): ToastKindMap[keyof ToastKindMap] => {
	// 	const keys = Object.keys(data) as (keyof typeof data)[];
	// 	const kind = keys.find(key => key in data) as keyof ToastKindMap;
	// 	return kind ? kind : 'Unknown';
	// };

	// const routesKind = (): RoutesKindMap[keyof RoutesKindMap] => {
	// 	const keys = Object.keys(data) as (keyof typeof data)[];
	// 	const kind = keys.find(key => key in data) as keyof RoutesKindMap;
	// 	return kind ? kind : 'unknown';
	// };
	const toastKind = () => {
		if ('label' in data) return 'Board';
		if ('category' in data) return 'Category';
		if ('value' in data) return 'Size';
		if ('colorValue' in data) return 'Color';
	};

	const routesKind = () => {
		if ('label' in data) return 'boards';
		if ('category' in data) return 'categories';
		if ('value' in data) return 'sizes';
		if ('colorValue' in data) return 'colors';
	};

	const onCopy = (id: string) => {
		navigator.clipboard.writeText(id);
		toast.success(`${toastKind()} id copied to the clipboard`);
	};
	const onDelete = async () => {
		try {
			setLoading(true);
			await axios.delete(`/api/${storeId}/${routesKind()}/${data.id}`);
			router.refresh();
			toast.success(`${toastKind()} deleted`);
		} catch (error) {
			toast.error('Something went wrong');
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};
	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={loading}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuSeparator className="border" />
					<DropdownMenuItem onClick={() => onCopy(data.id)}>
						<Copy className="mr-2 h-4 w-4" />
						Copy Id
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => {
							router.push(`/${storeId}/${routesKind()}/${data.id}`);
						}}
					>
						<Edit className="mr-2 h-4 w-4" />
						Update
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setOpen(true)}>
						<Trash className="mr-2 h-4 w-4" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};
