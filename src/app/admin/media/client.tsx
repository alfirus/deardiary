"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AdminHeader from '@/components/admin-header';
import AdminCard from '@/components/admin-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function MediaClient({ media }: { media: any[] }) {
	const [uploading, setUploading] = useState(false);
	const router = useRouter();
	const supabase = createClient();

	async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.target.files || e.target.files.length === 0) {
			return;
		}

		setUploading(true);
		const file = e.target.files[0];
		const fileExt = file.name.split('.').pop();
		const fileName = `${Math.random()}.${fileExt}`;
		const filePath = `${fileName}`;

		const { error: uploadError } = await supabase.storage.from('media').upload(filePath, file);

		if (uploadError) {
			toast.error(uploadError.message);
			setUploading(false);
			return;
		}

		const {
			data: { publicUrl },
		} = supabase.storage.from('media').getPublicUrl(filePath);

		// Save to database
		const { error: dbError } = await supabase.from('media').insert({
			filename: file.name,
			url: publicUrl,
			type: file.type,
		});

		if (dbError) {
			toast.error(dbError.message);
		} else {
			toast.success('Uploaded successfully');
			router.refresh();
		}
		setUploading(false);
	}

	async function handleDelete(id: number, url: string) {
		if (!confirm('Are you sure?')) return;

		// Ideally delete from storage too, extracting path from URL
		// For now just DB delete for simplicity
		const { error } = await supabase.from('media').delete().eq('id', id);

		if (error) {
			toast.error(error.message);
			return;
		}

		toast.success('Media deleted');
		router.refresh();
	}

	return (
		<div>
			<AdminHeader title="Media">
				<div className="flex items-center gap-2">
					<Input type="file" onChange={handleUpload} disabled={uploading} />
					{uploading && <span>Uploading...</span>}
				</div>
			</AdminHeader>

			{/* Desktop View */}
			<div className="hidden md:block rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Preview</TableHead>
							<TableHead>Filename</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{media?.map((item) => (
							<TableRow key={item.id}>
								<TableCell>
									<img src={item.url} alt={item.filename} className="w-16 h-16 object-cover rounded" />
								</TableCell>
								<TableCell>
									<a href={item.url} target="_blank" className="text-blue-500 hover:underline">
										{item.filename}
									</a>
								</TableCell>
								<TableCell>
									<Button variant="destructive" size="sm" onClick={() => handleDelete(item.id, item.url)}>
										Delete
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{/* Mobile View */}
			<div className="grid gap-4 md:hidden">
				{media?.map((item) => (
					<AdminCard
						key={item.id}
						title={item.filename}
						footer={
							<Button variant="destructive" size="sm" onClick={() => handleDelete(item.id, item.url)}>
								Delete
							</Button>
						}
					>
						<div className="flex justify-center mb-4">
							<img src={item.url} alt={item.filename} className="max-h-48 rounded object-contain" />
						</div>
						<div className="flex justify-between text-sm">
							<span className="text-muted-foreground">Type:</span>
							<span>{item.type}</span>
						</div>
						<div className="text-sm mt-2">
							<a href={item.url} target="_blank" className="text-blue-500 hover:underline break-all">
								View Original
							</a>
						</div>
					</AdminCard>
				))}
			</div>
		</div>
	);
}
