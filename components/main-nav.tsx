'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

export const MainNav = ({
	className,
	...props
}: React.HTMLAttributes<HTMLElement>) => {
	const pathname = usePathname();
	const params = useParams();
	const { storeId } = params;
	const routes = [
		{
			href: `/${storeId}`,
			label: 'Overview',
			active: pathname === `/${storeId}`,
		},
		{
			href: `/${storeId}/boards`,
			label: 'Boards',
			active: pathname === `/${storeId}/boards`,
		},
		{
			href: `/${storeId}/categories`,
			label: 'Categories',
			active: pathname === `/${storeId}/categories`,
		},
		{
			href: `/${storeId}/sizes`,
			label: 'Sizes',
			active: pathname === `/${storeId}/sizes`,
		},
		{
			href: `/${storeId}/colors`,
			label: 'Colors',
			active: pathname === `/${storeId}/colors`,
		},
		{
			href: `/${storeId}/products`,
			label: 'Products',
			active: pathname === `/${storeId}/products`,
		},
		{
			href: `/${storeId}/orders`,
			label: 'Orders',
			active: pathname === `/${storeId}/orders`,
		},
		{
			href: `/${storeId}/settings`,
			label: 'Settings',
			active: pathname === `/${storeId}/settings`,
		},
	];
	return (
		<nav
			className={cn('flex items-center pl-4 space-x-4 lg:space-x-6', className)}
		>
			{routes.map(({ href, label, active }) => (
				<Link
					key={href}
					href={href}
					className={cn(
						'text-sm font-medium transition-colors hover:text-primary',
						active ? 'text-black dark:text-white' : 'text-muted-foreground'
					)}
				>
					{label}
				</Link>
			))}
		</nav>
	);
};
