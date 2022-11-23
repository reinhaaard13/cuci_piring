import React from "react";

import { Box, Grid, Text } from "@mantine/core";
import FeedItem from "../molecules/FeedItem";

type Props = {};

const FeedSection = (props: Props) => {
	const DUMMY_FEED = [
		{
			task_id: 1,
			title: "Task 1",
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, cumque!",
			created_at: "2022-11-20T00:00:00.000Z",
			created_by: {
				user_id: 1,
				fullname: "Reinhard Kevin",
			},
			family_id: 1,
			category_id: 1,
		},
		{
			task_id: 2,
			title: "Task 2",
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, cumque!",
			created_at: "2022-11-19T00:00:00.000Z",
			created_by: {
				user_id: 2,
				fullname: "Herman Samosir",
			},
			family_id: 1,
			category_id: 1,
		},
    {
			task_id: 3,
			title: "Task 3",
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, cumque!",
			created_at: "2022-11-16T00:00:00.000Z",
			created_by: {
				user_id: 1,
				fullname: "Reinhard Kevin",
			},
			family_id: 1,
			category_id: 1,
		},
	];

	return (
		<Box
			sx={(theme) => ({
				marginTop: theme.spacing.md,
			})}
		>
			<Text
				sx={(theme) => ({
          marginBottom: theme.spacing.xs,
					color:
						theme.colorScheme === "light"
							? theme.colors.gray[7]
							: theme.colors.gray[3],
				})}
			>
				Cuci Piring Terbaru
			</Text>

			<Grid gutter={"sm"}>
				{DUMMY_FEED.map((feed) => (
					<FeedItem key={feed.task_id} feed={feed} />
				))}
			</Grid>
		</Box>
	);
};

export default FeedSection;
