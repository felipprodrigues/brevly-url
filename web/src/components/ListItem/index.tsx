import { Copy, Trash } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteShortUrl, postHitShortUrl, queryClient } from "../../api";
import { Button } from "../Button";

export interface ListItemProps {
	id: string;
	hits: number;
	originalUrl: string;
	shortUrl: string;
}

export function ListItem({ id, originalUrl, shortUrl, hits }: ListItemProps) {
	const { mutateAsync: hitShortUrl } = useMutation({
		mutationFn: postHitShortUrl,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["links"] });
		},
	});

	const { mutateAsync: delShortUrl } = useMutation({
		mutationFn: deleteShortUrl,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["links"] });
		},
	});

	const handleCopyToClipboard = async () => {
		try {
			await hitShortUrl(shortUrl);
			const linkToCopy = `${window.location.origin}/${shortUrl}`;
			await navigator.clipboard.writeText(linkToCopy);
			toast.info("Link copiado para a área de transferência!");
		} catch (err) {
			console.error("Clipboard copy failed:", err);
			toast.error("Falha ao copiar o link!");
		}
	};

	const handleOpenLink = async () => {
		console.log("Opening link:", shortUrl);
		await hitShortUrl(shortUrl);
		window.open(`${window.location.origin}/${shortUrl}`, "_blank");
		toast.info("Link aberto em nova aba!");
	};

	const handleDelete = async () => {
		await delShortUrl(shortUrl);
		toast.info("Link excluído com sucesso!");
	};

	return (
		<li
			id={id}
			className="flex flex-row justify-between items-center border-t-1 border-gray-200 h-18"
		>
			<div className="flex flex-col items-start">
				<button
					type="button"
					onClick={handleOpenLink}
					className="text-[#2C46B1] text-lg font-semibold truncate w-50 sm:w-auto hover:cursor-pointer"
				>
					{`${window.location.origin}/${shortUrl}`}
				</button>
				<span className="text-gray-500 truncate w-50 sm:w-auto">
					{originalUrl}
				</span>
			</div>
			<div className="flex flex-row items-center gap-5">
				<p className="text-gray-500">{hits} acessos</p>
				<div className="flex flex-row items-center gap-1">
					<Button
						Icon={Copy}
						variant="secondary"
						onClick={handleCopyToClipboard}
					/>
					<Button Icon={Trash} variant="secondary" onClick={handleDelete} />
				</div>
			</div>
		</li>
	);
}
