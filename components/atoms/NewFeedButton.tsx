import React from "react";

import { IoIosCreate } from "react-icons/io";
import { Box, ActionIcon, Text } from "@mantine/core";

type Props = {};

const NewFeedButton = (props: Props) => {
	return (
		<ActionIcon
			size={60}
			color={"cyan"}
			variant={"filled"}
			radius={"lg"}
			sx={(theme) => ({
				position: "fixed",
				bottom: theme.spacing.lg,
				right: theme.spacing.lg,
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
        boxShadow: theme.shadows.sm
			})}
		>
			<IoIosCreate />
			<Text sx={(theme) => ({ fontSize: theme.fontSizes.xs, fontWeight: 600 })}>
				CUCI
			</Text>
		</ActionIcon>
	);
};

export default NewFeedButton;
