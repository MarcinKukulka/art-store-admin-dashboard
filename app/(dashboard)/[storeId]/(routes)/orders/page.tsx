import { StoreBoardClient } from '@/components/board/board-client';
import { OrderClient } from '@/components/order/board-client';
import { OrderColumn } from '@/components/table/order-column';
import prismadb from '@/lib/prismadb';
import { formatter } from '@/lib/utils';

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
	const orders = await prismadb.order.findMany({
		where: {
			storeId: params.storeId,
		},
		include: {
			orderItems: {
				include: { product: true },
			},
		},
		orderBy: { createdAt: 'desc' },
	});
	const formattedData: OrderColumn[] = orders.map(
		({
			id,
			phone,
			address,
			isPaid,
			orderItems,
			storeId,
			updatedAt,
			createdAt,
		}) => ({
			id,
			phone,
			address,
			isPaid,
			products: orderItems.map(({ product }) => product.name).join(', '),
			totalPrice: formatter.format(
				orderItems.reduce((total, item) => {
					return total + Number(item.product.price);
				}, 0)
			),
			storeId,

			createdAt: Intl.DateTimeFormat('pl-PL', {
				year: 'numeric',
				month: 'numeric',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
			}).format(createdAt),
		})
	);

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<OrderClient data={formattedData} />
			</div>
		</div>
	);
};

export default OrdersPage;
