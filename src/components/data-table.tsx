"use client";

import dynamic from 'next/dynamic';
import { TableProps } from 'react-data-table-component';

const RDT = dynamic(() => import('react-data-table-component'), { ssr: false });

const customStyles = {
	table: {
		style: {
			backgroundColor: 'var(--background)',
			color: 'var(--foreground)',
		},
	},
	headRow: {
		style: {
			backgroundColor: 'var(--background)',
			color: 'var(--foreground)',
			borderBottomColor: 'var(--border)',
		},
	},
	headCells: {
		style: {
			fontSize: 'var(--text-base)',
			fontWeight: 'bold',
			color: 'var(--foreground)',
		},
	},
	rows: {
		style: {
			backgroundColor: 'var(--background)',
			color: 'var(--foreground)',
			borderBottomColor: 'var(--border)',
			'&:not(:last-of-type)': {
				borderBottomStyle: 'solid',
				borderBottomWidth: '1px',
				borderBottomColor: 'var(--border)',
			},
		},
	},
	cells: {
		style: {
			fontSize: 'var(--text-base)',
			color: 'var(--foreground)',
		},
	},
	pagination: {
		style: {
			backgroundColor: 'var(--background)',
			color: 'var(--foreground)',
			borderTopColor: 'var(--border)',
		},
		pageButtonsStyle: {
			color: 'var(--foreground)',
			fill: 'var(--foreground)',
			'&:disabled': {
				cursor: 'unset',
				color: 'var(--muted-foreground)',
				fill: 'var(--muted-foreground)',
			},
			'&:hover:not(:disabled)': {
				backgroundColor: 'var(--muted)',
			},
			'&:focus': {
				outline: 'none',
				backgroundColor: 'var(--muted)',
			},
			svg: {
				fill: 'var(--foreground)',
			},
		},
	},
};

export default function DataTable<T>(props: TableProps<T>) {
	const Component = RDT as any;
	return <Component customStyles={customStyles} {...props} />;
}
