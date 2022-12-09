import React from "react";

import { Box, Grid, Text, Skeleton, Flex, Card } from "@mantine/core";
import FeedItem from "../molecules/FeedItem";
import { useQuery } from "react-query";
import PostApi from "../../services/PostApi";
import { useRouter } from "next/router";
import { ApiResponse } from "../../types/global";
import { IFamily } from "../../models/Family";
import Image from "next/image";
import useColorScheme from "../../hooks/useColorScheme";
import { IPost } from "../../models/Post";

type Props = {};

const FeedSection = (props: Props) => {
	const { colorScheme } = useColorScheme()
	const { query } = useRouter();

	const { data, isSuccess, isLoading } = useQuery<ApiResponse<IFamily>>(
		["Family", query.familyCode],
		() => PostApi.getFamilyWithPosts(query.familyCode as string)
	);

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
				{isSuccess &&
					data &&
					data.data.posts.map((feed) => (
						<FeedItem key={feed._id} feed={feed as IPost} />
					))}
				{isLoading && (
					<Grid.Col sm={6}>
						<Skeleton height={400}></Skeleton>
					</Grid.Col>
				)}
				{isSuccess && data && data.data.posts.length === 0 && (
					<Grid.Col sm={6}>
						<Card
							radius="md"
							withBorder
							component={Flex}
							justify={"center"}
							align={"center"}
							direction={"column"}
							mih={300}
						>
							<Image
								src={
									"https://res.cloudinary.com/reinhaaard/image/upload/v1670481044/cucipiring/emptybox_zkep99.svg"
								}
								alt="empty"
								height={100}
								width={100}
								style={{
									opacity: "50%",
									filter: colorScheme === "dark" ? "invert(1)" : "invert(0)",
								}}
							/>
							<Text opacity={"50%"}>Belum ada post.</Text>
						</Card>
					</Grid.Col>
				)}
			</Grid>
		</Box>
	);
};

export default FeedSection;
