import { SettingsForm } from '@/components/settings-form';
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

type SettingProps = {
	params: {
		storeId: string;
	};
};

const Settings = async ({ params }: SettingProps) => {
	const { storeId } = params;

	const { userId } = auth();

	if (!userId) redirect('/sign-in');

	const store = await prismadb.store.findFirst({
		where: { id: storeId, userId },
	});

	if (!store) redirect('/');

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<SettingsForm initialData={store} />
			</div>
		</div>
	);
};

export default Settings;
