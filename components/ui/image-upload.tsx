'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';

type ImageUploadProps = {
	disabled?: boolean;
	onChange: (value: string) => void;
	onRemove: (value: string) => void;
	value: string[];
};

const ImageUpload = ({
	disabled,
	onChange,
	onRemove,
	value,
}: ImageUploadProps) => {
	const [mount, setMount] = useState(false);

	useEffect(() => {
		setMount(true);
	}, []);

	const upload = (result: any) => {
		onChange(result.info.secure_url);
	};

	if (!mount) return null;

	return (
		<div>
			<div className="mb-4 flex items-center gap-4">
				{value.map(url => (
					<div
						key={url}
						className="relative w-[200px] h-[200px] rounded overflow-hidden"
					>
						<div className="z-10 absolute top-2 right-2">
							<Button
								type="button"
								onClick={() => onRemove(url)}
								variant="destructive"
								size="icon"
							>
								<Trash className="h-4 w-4" />
							</Button>
						</div>
						<Image priority sizes='10vw' fill className="object-cover" alt="Image" src={url}></Image>
					</div>
				))}
			</div>
			<CldUploadWidget onUpload={upload} uploadPreset="iiapyw5h">
				{({ open }) => {
					const onClick = () => {
						open();
					};
					return (
						<Button
							type="button"
							disabled={disabled}
							variant="secondary"
							onClick={onClick}
						>
							<ImagePlus className="h-4 w-4 mr-2" />
							Upload image
						</Button>
					);
				}}
			</CldUploadWidget>
		</div>
	);
};

export default ImageUpload;
