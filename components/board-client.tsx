'use client';

import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';

export const StoreBoardClient = () => {

    const router = useRouter()
    const params = useParams()

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title="Store board (0)"
					description="Manage boards of your store"
				/>
				<Button onClick={()=> router.push(`/${params.storeId}/boards/new`)}>
					<Plus className="mr-2 h-4 w-4" />
					Add new
				</Button>
			</div>
            <Separator/>
		</>
	);
};
