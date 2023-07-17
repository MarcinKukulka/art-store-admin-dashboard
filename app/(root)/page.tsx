'use client';

import { Modal } from '@/components/ui/modal';
import { useModalStore } from '@/hooks/use-modal';
import { useEffect } from 'react';

const Home = () => {
	const { onOpen, isOpen } = useModalStore();

	useEffect(() => {
		if (!isOpen) onOpen();
	}, [isOpen, onOpen]);

	return <div className="p-4">root page</div>;
};

export default Home;
