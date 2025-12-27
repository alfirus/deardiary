import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface AdminCardProps {
	title: string;
	children: ReactNode;
	footer?: ReactNode;
}

export default function AdminCard({ title, children, footer }: AdminCardProps) {
	return (
		<Card>
			<CardHeader className="border-b">
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2 pt-4">{children}</CardContent>
			{footer && (
				<CardFooter className="border-t pt-4">
					<div className="flex justify-end w-full">{footer}</div>
				</CardFooter>
			)}
		</Card>
	);
}
