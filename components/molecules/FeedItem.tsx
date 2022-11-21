import React from "react";

import { useMantineTheme } from "@mantine/core";
import { Box, Text } from "@mantine/core";
import moment from "moment";
import FeedItemMeta from "../atoms/FeedItemMeta";
import LikeButton from "../atoms/LikeButton";

type Props = {
	feed: any;
};

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
				position: "relative",
			})}
		>
			<Text style={{ fontWeight: 600 }}>{props.feed.title}</Text>
			<Text sx={{ fontSize: theme.fontSizes.sm }}>
				{props.feed.description}
			</Text>

			<FeedItemMeta user={props.feed.created_by} time={props.feed.created_at} />
			<LikeButton />
		</Box>
	);
};

export default FeedItem;
