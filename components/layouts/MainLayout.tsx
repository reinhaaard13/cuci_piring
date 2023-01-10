import {
	Box,
	Container,
	Text,
	Transition,
	useMantineTheme,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import Header from "../organism/Header";
import UserApi from "../../services/UserApi";
import { useRouter } from "next/router";
import useUser from "../../hooks/useUser";
import useColorScheme from "../../hooks/useColorScheme";
import Loader from "../atoms/Loader";

type Props = {
	children: React.ReactNode;
};

const MainLayout = (props: Props) => {
	const { data, isSuccess } = useQuery(["User"], UserApi.getAuthenticatedUser);
	const theme = useMantineTheme();

	return (
		<>
			{isSuccess && (
				<Container size={"lg"}>
					<Header isAuthenticated={true} name={data.fullname} />
					{props.children}
				</Container>
			)}
			<Transition
				mounted={!isSuccess}
				transition={"fade"}
				timingFunction="ease"
				duration={300}
			>
				{(styles) => (
					<div
						style={{
							position: "fixed",
							height: "100vh",
							width: "100%",
							top: 0,
							left: 0,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							zIndex: 999,
							...styles,
						}}
					>
						<div>
							<Loader />
							<Text mt={theme.spacing.sm} fw={600}>
								Memuat CuciPiring...
							</Text>
						</div>
					</div>
				)}
			</Transition>
		</>
	);
};

export default MainLayout;
