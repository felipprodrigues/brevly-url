import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getShortUrl } from "../api";
import Logo from "../assets/Logo_Icon.svg";
import { Info } from "../components/Info";

export function RedirectPage() {
	const { shortUrl } = useParams();
	if (!shortUrl) {
		window.location.href = "/not-found";
		return null;
	}

	const { data, isLoading, error } = useQuery({
		queryKey: ["redirect", shortUrl],
		queryFn: () => getShortUrl(shortUrl),
		enabled: !!shortUrl,
	});

	if (data?.originalUrl) {
		window.location.href = data.originalUrl;
		return null;
	}

	if (!isLoading && !data && error) {
		console.error("Error fetching short URL:", error);
		window.location.href = "/not-found";
		return null;
	}

	return (
		<Info
			Icon={Logo}
			info="Redirecionando..."
			description="O link será aberto automaticamente em alguns instantes."
			linkTitle="Acesse aqui"
			linkDescription="Não foi redirecionado?"
			linkPath={data?.originalUrl}
			isLoading={isLoading}
		/>
	);
}
