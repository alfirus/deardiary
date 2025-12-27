"use client";

import { useEffect } from 'react';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';

interface EditorProps {
	onChange?: (value: string) => void;
	initialContent?: string;
	editable?: boolean;
	className?: string;
}

export default function Editor({ onChange, initialContent, editable = true, className }: EditorProps) {
	const editor = useCreateBlockNote();

	useEffect(() => {
		async function loadContent() {
			if (!initialContent) return;

			// Try parsing as JSON first (backward compatibility)
			try {
				const jsonBlocks = JSON.parse(initialContent);
				if (Array.isArray(jsonBlocks)) {
					editor.replaceBlocks(editor.document, jsonBlocks);
					return;
				}
			} catch (e) {
				// Not valid JSON, proceed to HTML parsing
			}

			// Parse as HTML
			const htmlBlocks = await editor.tryParseHTMLToBlocks(initialContent);
			editor.replaceBlocks(editor.document, htmlBlocks);
		}

		loadContent();
	}, [editor]); // Only rely on editor which is stable, ignores updates to initialContent after mount to emulate 'initial' behavior

	const { resolvedTheme } = useTheme();
	// Map "system" or undefined to light/dark
	const currentTheme = resolvedTheme === 'dark' ? 'dark' : 'light';

	return (
		<div className={cn(className)}>
			<BlockNoteView
				editor={editor}
				editable={editable}
				onChange={async () => {
					if (onChange) {
						const html = await editor.blocksToFullHTML(editor.document);
						onChange(html);
					}
				}}
				theme={currentTheme}
			/>
		</div>
	);
}
