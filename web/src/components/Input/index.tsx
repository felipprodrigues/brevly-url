interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	htmlFor: string;
	label: string;
}

export function Input({ label, htmlFor, ...props }: InputProps) {
	return (
		<div className="flex flex-col gap-2 justify-center">
			<label htmlFor={htmlFor} className="uppercase text-gray-500">
				{label}
			</label>
			<input {...props} />
		</div>
	);
}
