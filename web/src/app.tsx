import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";

import { QueryClientProvider } from "@tanstack/react-query";
import { Bounce, ToastContainer } from "react-toastify";
import { queryClient } from "./api";
import { MainPage } from "./pages/MainPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RedirectPage } from "./pages/RedirectPage";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route index element={<MainPage />} />
			<Route path="/:shortUrl" element={<RedirectPage />} />
			<Route path="/not-found" element={<NotFoundPage />} />
		</Route>,
	),
);

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				transition={Bounce}
			/>
		</QueryClientProvider>
	);
}
