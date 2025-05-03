import type { Icon as IconType } from "@phosphor-icons/react";
import type React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary";
	Icon?: IconType;
	children?: React.ReactNode;
}

export function Button({
	variant = "primary",
	Icon,
	children,
	...props
}: ButtonProps) {
	switch (variant) {
		case "primary":
			return (
				<button
					className="hover:cursor-pointer rounded-lg w-full p-4 text-white bg-[#2C46B1] hover:bg-[#2C4091] disabled:opacity-50 disabled:cursor-not-allowed"
					{...props}
				>
					{children && children}
				</button>
			);
		case "secondary":
			return (
				<div className="hover:cursor-pointer w-fit h-10 p-2 bg-gray-200 rounded-sm hover:outline hover:outline-offset-0 hover:outline-[#2C46B1] ">
					<button
						className="hover:cursor-pointer text-gray-500 h-full font-semibold grid grid-rows-none grid-flow-col items-center content-center disabled:opacity-50 disabled:cursor-not-allowed"
						{...props}
					>
						{Icon && <Icon size={16} className="fill-gray-600 m-0.5" />}
						{children && <p className="ml-0.5">{children}</p>}
					</button>
				</div>
			);
	}
}
