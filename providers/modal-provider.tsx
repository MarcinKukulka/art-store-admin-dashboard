'use client';

import { StoreModal } from '@/components/modals/store-modal';
import { useEffect, useState } from 'react';

export const ModalProvider = () => {
	const [mount, setMount] = useState(false);

	useEffect(() => {
		setMount(true);
	}, []);

	if (!mount) return null;

	return (
		<>
			<StoreModal />
		</>
	);
};
