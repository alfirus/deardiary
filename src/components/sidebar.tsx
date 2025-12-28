import { SidebarContent, SidebarData } from '@/components/sidebar-content';

interface SidebarProps {
	content: SidebarData;
}

export function Sidebar({ content }: SidebarProps) {
	return (
		<section className="hidden md:flex flex-col">
			<SidebarContent content={content} />
		</section>
	);
}
