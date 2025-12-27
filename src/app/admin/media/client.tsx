"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function MediaClient({ media }: { media: any[] }) {
  const [uploading, setUploading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }

    setUploading(true)
    const file = e.target.files[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file)

    if (uploadError) {
      toast.error(uploadError.message)
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(filePath)

    // Save to database
    const { error: dbError } = await supabase
      .from('media')
      .insert({
        filename: file.name,
        url: publicUrl,
        type: file.type
      })

    if (dbError) {
      toast.error(dbError.message)
    } else {
      toast.success("Uploaded successfully")
      router.refresh()
    }
    setUploading(false)
  }

  async function handleDelete(id: number, url: string) {
    if (!confirm("Are you sure?")) return

    // Ideally delete from storage too, extracting path from URL
    // For now just DB delete for simplicity
    const { error } = await supabase
      .from("media")
      .delete()
      .eq("id", id)

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success("Media deleted")
    router.refresh()
  }

  return (
			<div>
				<div className="flex justify-between items-center mb-6">
					<h1 className="font-bold">Media</h1>
					<div className="flex items-center gap-2">
						<Input type="file" onChange={handleUpload} disabled={uploading} />
						{uploading && <span>Uploading...</span>}
					</div>
				</div>

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
		);
}
