"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, Copy, Terminal } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function DatabaseSetupInstructions({ schemaSql }: { schemaSql: string }) {
  const [isOpen, setIsOpen] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(schemaSql)
    toast.success("SQL copied to clipboard")
  }

  return (
			<div className="mb-8">
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Profiles table not found</AlertTitle>
					<AlertDescription>
						Your database is missing the required <code>profiles</code> table. The application will not function correctly without it.
					</AlertDescription>
					<div className="mt-4 flex gap-2">
						<Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)}>
							{isOpen ? 'Hide Instructions' : 'View Setup Instructions'}
						</Button>
						<Button variant="secondary" size="sm" onClick={() => window.open('https://supabase.com/dashboard/project/_/sql', '_blank')}>
							Open Supabase SQL Editor
						</Button>
					</div>
				</Alert>

				{isOpen && (
					<div className="mt-4 border rounded-lg overflow-hidden bg-muted">
						<div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
							<div className="flex items-center gap-2 font-semibold">
								<Terminal className="w-4 h-4" />
								Setup SQL
							</div>
							<Button size="icon" variant="ghost" onClick={copyToClipboard} title="Copy SQL">
								<Copy className="w-4 h-4" />
							</Button>
						</div>
						<div className="p-4 overflow-x-auto">
							<pre className="font-mono">{schemaSql}</pre>
						</div>
					</div>
				)}
			</div>
		);
}
