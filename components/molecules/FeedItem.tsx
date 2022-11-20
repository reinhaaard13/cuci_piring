import React from "react";

import { useMantineTheme } from "@mantine/core";
import { Box, Text } from "@mantine/core";
import moment from "moment";
import FeedItemAuthor from "../atoms/FeedItemAuthor";

type Props = {};

const FeedItem = (props: Props) => {
	const theme = useMantineTheme();

	return (
		<Box
			sx={(theme) => ({
				marginBottom: theme.spacing.xs,
				backgroundColor:
					theme.colorScheme === "light" ? "white" : theme.colors.dark[5],
				borderRadius: theme.radius.md,
				padding: theme.spacing.sm,
				boxShadow: theme.shadows.sm,
			})}
		>
			<Text style={{ fontWeight: 600 }}>Item Title</Text>
			<Text sx={{ fontSize: theme.fontSizes.sm }}>
				Item Description Lorem ipsum dolor sit amet consectetur adipisicing
				elit. Voluptatibus, explicabo!
			</Text>

			<FeedItemAuthor />
		</Box>
	);
};

export default FeedItem;
