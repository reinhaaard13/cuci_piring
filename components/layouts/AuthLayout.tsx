import { Box, Container } from "@mantine/core";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Token from "../../services/Token";
import Header from "../organism/Header";

type Props = {
	children: React.ReactNode;
};

const AuthLayout = (props: Props) => {
	const router = useRouter();
	useEffect(() => {
		const token = Token.getToken();
		if (token) {
			router.replace("/");
		}
	}, []);

	return (
		<>
			<Container size={"lg"}>
				<Header isAuthenticated={false} />
				{props.children}
			</Container>
		</>
	);
};

export default AuthLayout;
