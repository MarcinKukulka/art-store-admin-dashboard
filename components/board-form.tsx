'use client';

import { StoreBoard } from '@prisma/client';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from '@/components/modals/alert-modal';
import { useOrigin } from '@/hooks/use-origin';
import ImageUpload from '@/components/ui/image-upload';

type BoardFormProps = {
	initialData: StoreBoard | null;
};

const formSchema = z.object({
	label: z.string().min(1),
	imageUrl: z.string().min(1),
});

type BoardFormValues = z.infer<typeof formSchema>;

type color = 'blue'
var color = 'blue'

export const BoardForm = ({ initialData }: BoardFormProps) => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const origin = useOrigin();

	const params = useParams();
	const {storeId, boardId} = params;
	const router = useRouter();

	const title = initialData ? `Edit ${color}` : 'Create board';
	const description = initialData ? 'Edit board' : 'Add a new board';
	const toastMessage = initialData ? 'Board updated' : 'Board created';
	const action = initialData ? 'Save changes' : 'Create';

	const form = useForm<BoardFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || { label: '', imageUrl: '' },
	});

	const onSubmit = async (data: BoardFormValues) => {
		try {
			setLoading(true);
			if (initialData) {
				await axios.patch(
					`/api/${storeId}/boards/${boardId}`,
					data
				);
			} else {
				await axios.post(`/api/${storeId}/boards`, data);
			}
			router.refresh();
			router.push(`/${storeId}/boards`)
			toast.success(toastMessage);
		} catch (error) {
			toast.error('Something went wrong');
		} finally {
			setLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setLoading(true);
			await axios.delete(`/api/${storeId}/boards/${boardId}`);
			router.refresh();
			router.push(`/${storeId}/boards`);
			toast.success('Board deleted');
		} catch (error) {
			toast.error('Make sure you removed all categories using this board first');
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
			<div className="flex items-center justify-between">
				<Heading title={title} description={description} />
				{initialData && (
					<Button
						disabled={loading}
						variant="destructive"
						size="sm"
						onClick={() => setOpen(true)}
					>
						<Trash className="h-4 w-4" />
					</Button>
				)}
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 w-full"
				>
					<FormField
						control={form.control}
						name="imageUrl"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Background image</FormLabel>
								<FormControl>
									<ImageUpload
										value={field.value ? [field.value] : []}
										disabled={loading}
										onChange={url => field.onChange(url)}
										onRemove={() => field.onChange('')}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="label"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Label</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="Board label"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button disabled={loading} className="ml-auto" type="submit">
						{action}
					</Button>
				</form>
			</Form>
			<Separator />
		</>
	);
};
