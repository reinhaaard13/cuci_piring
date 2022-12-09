import React from "react";

import { Grid, useMantineTheme, Avatar } from "@mantine/core";
import { Box, Text, Card } from "@mantine/core";
import moment from "moment";
import FeedItemMeta from "../atoms/FeedItemMeta";
import LikeButton from "../atoms/LikeButton";
import Image from "next/image";
import { IPost } from "../../models/Post";
import { IUser } from "../../models/User";

type Props = {
	feed: IPost;
};

const FeedItem = (props: Props) => {
	const theme = useMantineTheme();

	return (
		<Grid.Col sm={6}>
			<Card
				sx={(theme) => ({
					backgroundColor:
						theme.colorScheme === "light" ? "white" : theme.colors.dark[5],
					// boxShadow: theme.shadows.sm,
					position: "relative",
				})}
				radius="md"
				withBorder
			>
				<Card.Section>
					<FeedItemMeta
						user={props.feed.createdBy}
						time={props.feed.createdAt as string}
					/>
				</Card.Section>

				<Card.Section
					sx={{
						position: "relative",
						aspectRatio: "4/3",
						marginBottom: theme.spacing.sm,
					}}
				>
					<Image
						src={
							props.feed.image
						}
						alt="Feed Image"
						fill
						style={{ objectFit: "cover" }}
					/>
				</Card.Section>
				<Box style={{ position: "relative" }}>
					<Text sx={{ fontWeight: 600 }}>{props.feed.postTitle}</Text>
					<Text sx={{ fontSize: theme.fontSizes.sm }}>
						{props.feed.postDescription}
					</Text>

					<LikeButton likedBy={props.feed.likedBy as IUser[]} postId={props.feed._id} />
				</Box>
			</Card>
		</Grid.Col>
	);
};

export default FeedItem;
