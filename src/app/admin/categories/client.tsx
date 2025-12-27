"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import AdminHeader from '@/components/admin-header';
import AdminCard from '@/components/admin-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const categorySchema = z.object({
	name: z.string().min(2),
	slug: z.string().min(2),
});

export default function CategoriesPage({ categories }: { categories: any[] }) {
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const supabase = createClient();

	const form = useForm<z.infer<typeof categorySchema>>({
		resolver: zodResolver(categorySchema),
		defaultValues: {
			name: '',
			slug: '',
		},
	});

	async function onSubmit(values: z.infer<typeof categorySchema>) {
		const { error } = await supabase.from('categories').insert(values);

		if (error) {
			toast.error(error.message);
			return;
		}

		toast.success('Category created');
		setOpen(false);
		form.reset();
		router.refresh();
	}

	async function handleDelete(id: number) {
		if (!confirm('Are you sure?')) return;

		const { error } = await supabase.from('categories').delete().eq('id', id);

		if (error) {
			toast.error(error.message);
			return;
		}

		toast.success('Category deleted');
		router.refresh();
	}

	return (
		<div>
			<AdminHeader title="Categories">
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button>Add Category</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add Category</DialogTitle>
						</DialogHeader>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input
													{...field}
													onChange={(e) => {
														field.onChange(e);
														// Auto-slug
														const slug = e.target.value
															.toLowerCase()
															.replace(/ /g, '-')
															.replace(/[^\w-]+/g, '');
														form.setValue('slug', slug);
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="slug"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Slug</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit">Create</Button>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			</AdminHeader>

			{/* Desktop View */}
			<div className="hidden md:block rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Slug</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{categories?.map((category) => (
							<TableRow key={category.id}>
								<TableCell>{category.id}</TableCell>
								<TableCell>{category.name}</TableCell>
								<TableCell>{category.slug}</TableCell>
								<TableCell>
									<Button variant="destructive" size="sm" onClick={() => handleDelete(category.id)}>
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
				{categories?.map((category) => (
					<AdminCard
						key={category.id}
						title={category.name}
						footer={
							<Button variant="destructive" size="sm" onClick={() => handleDelete(category.id)}>
								Delete
							</Button>
						}
					>
						<div className="flex justify-between text-sm">
							<span className="text-muted-foreground">ID:</span>
							<span>{category.id}</span>
						</div>
						<div className="flex justify-between text-sm">
							<span className="text-muted-foreground">Slug:</span>
							<span>{category.slug}</span>
						</div>
					</AdminCard>
				))}
			</div>
		</div>
	);
}
