'use client';

import { useOrigin } from '@/hooks/use-origin';
import { useParams } from 'next/navigation';
import { ApiAlert } from '@/components/ui/api-alert';

type ApiListProps = { entityName: string; entityId: string };

export const ApiList = ({ entityName, entityId }: ApiListProps) => {
	const params = useParams();
	const origin = useOrigin();

	const apiUrl = `${origin}/api/${params.storeId}`;

	return (
		<>
			<ApiAlert
				title="GET"
				variant="public"
				description={`${apiUrl}/${entityName}`}
			/>
			<ApiAlert
				title="GET"
				variant="public"
				description={`${apiUrl}/${entityName}/{${entityId}}`}
			/>
			<ApiAlert
				title="POST"
				variant="admin"
				description={`${apiUrl}/${entityName}`}
			/>
            <ApiAlert
				title="PATCH"
				variant="admin"
				description={`${apiUrl}/${entityName}/{${entityId}}`}
			/>
            <ApiAlert
				title="DELETE"
				variant="admin"
				description={`${apiUrl}/${entityName}/{${entityId}}`}
			/>
		</>
	);
};
