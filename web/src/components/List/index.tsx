import { DownloadSimple, Link } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { postExport } from "../../api";
import { Button } from "../Button";
import { ListItem, type ListItemProps } from "../ListItem";

const NoItems = () => (
	<div className="flex flex-col items-center justify-center mt-9 mb-6 pt-5 border-t-1 border-gray-200">
		<Link size={32} color="#74798B" />
		<p className="text-gray-500 uppercase mt-3">
			Ainda não existem links cadastrados
		</p>
	</div>
);

export function List({
	links,
	isLoading,
}: { links?: ListItemProps[]; isLoading?: boolean }) {
	const { mutateAsync: downloadCSV } = useMutation({
		mutationFn: postExport,
	});

	const handleDownloadCSV = async () => {
		const res = await downloadCSV();
		console.log(res);
		const a = document.createElement("a");
		a.href = res?.url;
		a.download = res.filename;
		a.target = "_blank";
		a.rel = "noopener noreferrer";
		a.style.display = "none";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};

	return (
		<div className="w-full sm:w-2xl p-6 sm:p-8 flex flex-col justify-center bg-gray-100 rounded-lg mt-3 sm:mt-0 sm:ml-5">
			<div className="flex flex-row justify-between items-center">
				<p className="font-bold text-gray-600 text-2xl">Meus links</p>
				<Button
					Icon={DownloadSimple}
					variant="secondary"
					onClick={handleDownloadCSV}
					disabled={isLoading || !links || links.length === 0}
				>
					Baixar CSV
				</Button>
			</div>
			<div>
				{isLoading ? (
					<div className="flex flex-col items-center justify-center mt-9 mb-6 pt-5 border-t-1 border-gray-200">
						<p className="text-gray-500 uppercase mt-3">Carregando...</p>
					</div>
				) : (
					<>
						{links && links.length === 0 ? (
							<NoItems />
						) : (
							<ul className="mt-5">
								{links?.map((link: ListItemProps) => (
									<ListItem
										key={link.id}
										id={link.id}
										hits={link.hits}
										originalUrl={link.originalUrl}
										shortUrl={link.shortUrl}
									/>
								))}
							</ul>
						)}
					</>
				)}
			</div>
		</div>
	);
}
