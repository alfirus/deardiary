import { ReactNode } from "react";

interface AdminHeaderProps {
	title: string;
	children?: ReactNode;
}

export default function AdminHeader({ title, children }: AdminHeaderProps) {
	return (
		<div className="flex justify-between items-center mb-6 border-b pb-2">
			<h1 className="font-bold">{title}</h1>
			{children && <div>{children}</div>}
		</div>
	);
}
