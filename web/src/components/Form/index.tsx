import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { post, queryClient } from "../../api";
import { Button } from "../Button";
import { Input } from "../Input";

export function Form() {
	const [originalUrl, setOriginalUrl] = useState<string>();
	const [shortUrl, setShortUrl] = useState<string>();

	const { mutateAsync: createShortUrl } = useMutation({
		mutationFn: post,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["links"] });
		},
	});

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!originalUrl || !shortUrl) {
			toast.error("Por favor, preencha as informações corretamente.");
			return;
		}

		if (!originalUrl.match(/^(http|https):\/\/[^ "]+$/)) {
			toast.error("Por favor, insira um link válido.");
			return;
		}
		if (!shortUrl.match(/^[a-zA-Z0-9-_]+$/)) {
			toast.error("Por favor, insira um link encurtado válido.");
			return;
		}

		try {
			await createShortUrl({ originalUrl, shortUrl });
			setOriginalUrl("");
			setShortUrl("");
			toast.info("Link encurtado com sucesso!");
		} catch (error) {
			console.error("Error saving shortened link:", error);
			toast.error("Erro ao gerar o link encurtado. Tente novamente.");
		}
	};

	return (
		<div className="w-full sm:w-95 p-6 sm:p-8 flex flex-col justify-center bg-gray-100 rounded-lg">
			<p className="font-bold text-gray-600 text-2xl">Novo link</p>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-4 justify-center mt-6"
			>
				<Input
					label="Link original"
					htmlFor="lo"
					id="lo"
					type="url"
					placeholder="www.exemplo.com.br"
					className="p-4 rounded-lg border border-gray-300"
					value={originalUrl}
					onChange={(e) => setOriginalUrl(e.target.value)}
					pattern="https://.*"
					minLength={10}
					required
				/>

				<Input
					label="Link Encurtado"
					htmlFor="le"
					id="le"
					type="text"
					placeholder="brev.ly/"
					className="p-4 rounded-lg border border-gray-300"
					value={shortUrl}
					onChange={(e) => setShortUrl(e.target.value)}
					pattern="/^[a-zA-Z0-9-_]+$/"
					title="Apenas letras, números, - e _ são permitidos."
					minLength={3}
					required
				/>
				<Button type="submit" disabled={!originalUrl || !shortUrl}>
					Salvar link
				</Button>
			</form>
		</div>
	);
}
