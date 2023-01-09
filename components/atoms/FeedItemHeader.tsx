import React, { useMemo, useState } from "react";

import {
	Avatar,
	Flex,
	Text,
	useMantineTheme,
	ActionIcon,
	Modal,
	UnstyledButton,
	Box,
	Stack,
} from "@mantine/core";
import { BsThreeDotsVertical } from "react-icons/bs";
import moment from "moment";
import getNameInitials from "../../utils/getNameInitial";
import getRandomColor from "../../utils/getRandomColor";
import useColorScheme from "../../hooks/useColorScheme";
import { IPost } from "../../models/Post";
import { IUser } from "../../models/User";
import useUser from "../../hooks/useUser";

type Props = {
	feed: IPost<IUser>;
};

const FeedItemHeader = (props: Props) => {
	const theme = useMantineTheme();

	const color = useMemo(() => getRandomColor(), []);

	return (
		<Flex
			sx={{
				justifyContent: "space-between",
				margin: theme.spacing.sm,
				alignItems: "center",
			}}
		>
			<Flex
				sx={(theme) => ({
					gap: theme.spacing.xs,
					alignItems: "center",
				})}
			>
				<Avatar radius="xl" color={color}>
					{getNameInitials(props.feed.createdBy.fullname)}
				</Avatar>
				<Text
					sx={{
						fontWeight: 500,
						fontSize: theme.fontSizes.sm,
					}}
				>
					{props.feed.createdBy.fullname}
				</Text>
			</Flex>
			<FeedActionMenu feed={props.feed} />
		</Flex>
	);
};

const FeedActionMenu = (props: {
	feed: IPost<IUser>;
}) => {
	const [opened, setOpened] = useState(false);
	const { user } = useUser()
	const { colorScheme } = useColorScheme();
	const theme = useMantineTheme();

	const isMyPost = props.feed.createdBy._id === user?._id;

	const actions: {
		label: string;
		onClick: () => void;
		accentColor?: string[];
	}[] = isMyPost ? [ // If it's my post, show delete option
		{
			label: "Share",
			onClick: () => {}
		},
		{
			label: "Delete",
			onClick: () => {
					
			},
			accentColor: theme.colors.red,
		},
		{
			label: "Cancel",
			onClick: () => setOpened(false),
		},
	] : [ // If it's not my post, show report option
		{
			label: "Report",
			onClick: () => {},
		},
		{
			label: "Share",
			onClick: () => {}
		},
		{
			label: "Cancel",
			onClick: () => setOpened(false),
		},
	];

	return (
		<>
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				centered
				transitionDuration={200}
				radius="md"
				withCloseButton={false}
				padding={theme.spacing.xs}
			>
				<Stack spacing={0}>
					{actions.map((action, idx) => (
						<UnstyledButton key={idx} onClick={action.onClick}>
							<Box
								sx={{
									padding: theme.spacing.xs,
									borderRadius: theme.radius.md,
									textAlign: "center",

									"&:hover": {
										backgroundColor:
											colorScheme === "dark"
												? theme.colors.dark[6]
												: theme.colors.gray[2],
									},
								}}
							>
								<Text color={action.accentColor && action.accentColor[6]} fw={500}>{action.label}</Text>
							</Box>
						</UnstyledButton>
					))}
				</Stack>
			</Modal>
			<ActionIcon radius={"lg"} onClick={() => setOpened(true)}>
				<BsThreeDotsVertical />
			</ActionIcon>
		</>
	);
};

export default FeedItemHeader;
