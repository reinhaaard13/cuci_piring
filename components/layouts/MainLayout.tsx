import { Box, Container } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import Header from "../organism/Header";
import UserApi from "../../services/UserApi";
import { useRouter } from "next/router";
import useUser from "../../hooks/useUser";

type Props = {
	children: React.ReactNode;
};

const MainLayout = (props: Props) => {
	const { data, isSuccess } = useQuery(["User"], UserApi.getAuthenticatedUser);

	if (isSuccess) {
		return (
			<>
				<Container
					size={"lg"}
				>
					<Header isAuthenticated={true} name={data.fullname} />
					{props.children}
				</Container>
			</>
		);
	} else {
		return <></>;
	}
};

export default MainLayout;
