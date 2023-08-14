'use client';

import { useOrigin } from '@/hooks/use-origin';
import { useParams } from 'next/navigation';
import { ApiAlert } from '@/components/ui/api-alert';

type ApiListProps = { subjectName: string; subjectId: string };

export const ApiList = ({ subjectName, subjectId }: ApiListProps) => {
	const params = useParams();
	const origin = useOrigin();

	const apiUrl = `${origin}/api/${params.storeId}`;

	return (
		<>
			<ApiAlert
				title="GET"
				variant="public"
				description={`${apiUrl}/${subjectName}`}
			/>
			<ApiAlert
				title="GET"
				variant="public"
				description={`${apiUrl}/${subjectName}/{${subjectId}}`}
			/>
			<ApiAlert
				title="POST"
				variant="admin"
				description={`${apiUrl}/${subjectName}`}
			/>
            <ApiAlert
				title="PATCH"
				variant="admin"
				description={`${apiUrl}/${subjectName}/{${subjectId}}`}
			/>
            <ApiAlert
				title="DELETE"
				variant="admin"
				description={`${apiUrl}/${subjectName}/{${subjectId}}`}
			/>
		</>
	);
};
