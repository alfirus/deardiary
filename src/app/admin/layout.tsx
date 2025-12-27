import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin-sidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect('/login');
	}

	// Check if user is admin
	const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();

	if (profile?.role !== 'admin') {
		redirect('/');
	}

	return (
		<SidebarProvider>
			<AdminSidebar />
			<main className="flex-1 w-full">
				<div className="p-4">
					<SidebarTrigger />
				</div>
				<div className="p-6">{children}</div>
			</main>
		</SidebarProvider>
	);
}
