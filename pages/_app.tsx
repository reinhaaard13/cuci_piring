import { NotificationsProvider } from "@mantine/notifications";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import AuthLayout from "../components/layouts/AuthLayout";
import MainLayout from "../components/layouts/MainLayout";
import ColorSchemeProvider from "../providers/ColorSchemeProvider";
import MantineProviders from "../providers/MantineProviders";
import { QueryClient, QueryClientProvider } from "react-query";
import WithAxios from "../components/layouts/WithAxios";
import UserProvider from "../providers/UserProvider";
import { ModalsProvider } from "@mantine/modals";

const queryClient = new QueryClient();

export default function App(props: AppProps) {
	const { Component, pageProps } = props;
	const router = useRouter();

	const isAuthPage = router && router.pathname === "/auth";

	return (
		<>
			<Head>
				<title>Cuci Piring</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<QueryClientProvider client={queryClient}>
				<ColorSchemeProvider>
					<MantineProviders>
						<ModalsProvider>
							<NotificationsProvider position="top-right">
								<WithAxios>
									{isAuthPage ? (
										<AuthLayout>
											<Component {...pageProps} />
										</AuthLayout>
									) : (
										<UserProvider>
											<MainLayout>
												<Component {...pageProps} />
											</MainLayout>
										</UserProvider>
									)}
								</WithAxios>
							</NotificationsProvider>
						</ModalsProvider>
					</MantineProviders>
				</ColorSchemeProvider>
			</QueryClientProvider>
		</>
	);
}
