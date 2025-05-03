import { useQuery } from "@tanstack/react-query";
import { get } from "../api";
import { Form } from "../components/Form";
import { List } from "../components/List";
import { Nav } from "../components/Nav";

export function MainPage() {
	const { data, isLoading } = useQuery({
		queryKey: ["links"],
		queryFn: get,
	});

	return (
		<main className="h-dvh w-full sm:w-fit mx-auto flex flex-col items-center sm:items-start justify-center content-center bg-gray-200">
			<Nav />
			<section className="w-full sm:w-fit p-3 sm:p-0 h-auto flex flex-col sm:flex-row items-start">
				<Form />
				<List links={data} isLoading={isLoading} />
			</section>
		</main>
	);
}
