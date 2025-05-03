import NotFoundIcon from "../assets/404.svg";
import { Info } from "../components/Info";

export function NotFoundPage() {
	return (
		<Info
			Icon={NotFoundIcon}
			info="Link não encontrado"
			description="O link que você está tentando acessar não existe, foi removido ou é uma URL inválida."
			linkTitle="brev.ly"
			linkDescription="Saiba mais em"
			linkPath="/"
		/>
	);
}
