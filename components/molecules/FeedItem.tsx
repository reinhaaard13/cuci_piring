import React from "react";

import { Grid, useMantineTheme, Avatar } from "@mantine/core";
import { Box, Text, Card } from "@mantine/core";
import moment from "moment";
import FeedItemMeta from "../atoms/FeedItemMeta";
import LikeButton from "../atoms/LikeButton";
import Image from "next/image";

type Props = {
	feed: any;
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
						user={props.feed.created_by}
						time={props.feed.created_at}
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
							"https://media.suara.com/pictures/653x366/2018/04/05/18230-cucian-piring-menumpuk-di-dapur.jpg"
						}
						alt="Feed Image"
						fill
						style={{ objectFit: "cover" }}
					/>
				</Card.Section>
				<Box style={{ position: "relative" }}>
					<Text sx={{ fontWeight: 600 }}>{props.feed.title}</Text>
					<Text sx={{ fontSize: theme.fontSizes.sm }}>
						{props.feed.description}
					</Text>

					<LikeButton />
				</Box>
			</Card>
		</Grid.Col>
	);
};

export default FeedItem;
