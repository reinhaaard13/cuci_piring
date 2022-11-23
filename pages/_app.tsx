import { NotificationsProvider } from "@mantine/notifications";
import { AppProps } from "next/app";
import Head from "next/head";
import MainLayout from "../components/layouts/MainLayout";
import ColorSchemeProvider from "../providers/ColorSchemeProvider";
import MantineProviders from "../providers/MantineProviders";

export default function App(props: AppProps) {
	const { Component, pageProps } = props;

	return (
		<>
			<Head>
				<title>Page title</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>

			<ColorSchemeProvider>
				<MantineProviders>
					<NotificationsProvider position="top-right">
						<MainLayout>
							<Component {...pageProps} />
						</MainLayout>
					</NotificationsProvider>
				</MantineProviders>
			</ColorSchemeProvider>
		</>
	);
}
