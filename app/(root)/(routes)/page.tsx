'use client';

import { useModalStore } from '@/hooks/use-modal';
import { useEffect } from 'react';

const Home = () => {
	const { onOpen, isOpen } = useModalStore();

	useEffect(() => {
		if (!isOpen) onOpen();
	}, [isOpen, onOpen]);

	return null
};

export default Home;
