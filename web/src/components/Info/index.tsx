interface InfoProps {
	Icon: string;
	info: string;
	description: string;
	linkTitle: string;
	linkDescription: string;
	linkPath: string;
	isLoading?: boolean;
}

export function Info({
	Icon,
	info,
	description,
	linkTitle,
	linkDescription,
	linkPath,
	isLoading,
}: InfoProps) {
	return (
		<div className="h-dvh w-fit sm:w-xl mx-auto flex flex-col items-center sm:items-start justify-center content-center bg-gray-200">
			<div className="w-full flex flex-col items-center justify-center gap-6 py-12 px-5 bg-gray-100 rounded-lg">
				<img src={Icon} alt="Logo" />
				<p className="text-gray-600 text-2xl font-bold">{info}</p>
				<p className="text-gray-500 text-center">
					{description}
					<br />
					{isLoading ? (
						<span className="text-gray-500">Aguarde...</span>
					) : (
						<>
							{linkPath ? linkDescription : "Ocorreu um erro ao redirecionar: "}{" "}
							<a
								href={linkPath || `${window.location.href}`}
								className="text-[#2C46B1] underline"
							>
								{linkPath ? linkTitle : "Tentar novamente."}
							</a>
						</>
					)}
				</p>
			</div>
		</div>
	);
}
