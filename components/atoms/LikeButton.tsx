import React from "react";

import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { Box, Text, useMantineTheme, UnstyledButton } from "@mantine/core";
import { useMutation, useQueryClient } from "react-query";
import PostApi from "../../services/PostApi";
import useUser from "../../hooks/useUser";
import { useRouter } from "next/router";
import { IUser } from "../../models/User";

type Props = {
	likedBy: IUser[] | string[];
	postId: string;
};

const LikeButton = (props: Props) => {
	const theme = useMantineTheme();
	const queryClient = useQueryClient();
	const { user } = useUser();
	const { query } = useRouter();

	const isLiked = props.likedBy.some((likeUser) => likeUser === user?._id);

	const handleOnLike = async () => {
		if (isLiked) return
		await likePostMutation.mutateAsync();
	};

	const likePostMutation = useMutation(() => PostApi.likePost(props.postId), {
		onMutate: async (newTodo) => {
			// cancel so that we don't refetch (optimistic update)
			await queryClient.cancelQueries(["Family", query.familyCode]);

			// Snapshot the previous value
			const previousPosts = queryClient.getQueryData([
				"Family",
				query.familyCode,
			]);

			// Optimistically update to the new value
			queryClient.setQueryData(["Family", query.familyCode], (old: any) => {
				const postIndex = old.data.posts.findIndex(
					(post: any) => post._id === props.postId
				);

				old.data.posts[postIndex].likedBy.push(user?._id);

				return old;
			});

			return { previousPosts };
		},
		onSettled: () => {
			queryClient.invalidateQueries(["Family", query.familyCode]);
		},
	});

	return (
		<UnstyledButton
			sx={{
				position: "absolute",
				top: 0,
				right: 0,
				color: isLiked ? theme.colors.red : theme.colors.gray[5],
				transition: "all 0.1s ease-in-out",
				textAlign: "center",
				"&:hover": {
					color: theme.colors.red[5],
				},
			}}
			onClick={handleOnLike}
		>
			{isLiked ? <IoIosHeart /> : <IoIosHeartEmpty />}
			<Text sx={{ fontSize: theme.fontSizes.xs, lineHeight: "unset" }}>
				{props.likedBy.length}
			</Text>
		</UnstyledButton>
	);
};

export default LikeButton;
