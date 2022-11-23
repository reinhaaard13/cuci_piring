import { Box } from "@mantine/core";
import React from "react";
import Header from "../organism/Header";

type Props = {
	children: React.ReactNode;
};

const MainLayout = (props: Props) => {
	return (
		<>
			<Header />
			<Box sx={(theme) => ({
				maxWidth: theme.breakpoints.lg,
				padding: `0 ${theme.spacing.md}px`,

				[theme.fn.largerThan("lg")]: {
					margin: `${theme.spacing.md}px auto`,
				}
			})}>{props.children}</Box>
		</>
	);
};

export default MainLayout;
