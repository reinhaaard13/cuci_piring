import React, { useMemo } from "react";

import { Avatar, Flex, Text, useMantineTheme } from "@mantine/core";
import moment from "moment";
import getNameInitials from "../../utils/getNameInitial";
import getRandomColor from "../../utils/getRandomColor";

type Props = {
	user: any;
	time: string;
};

const FeedItemMeta = (props: Props) => {
	const theme = useMantineTheme();

	const color = useMemo(() => getRandomColor(), [])

	return (
		<Flex
			sx={{
				justifyContent: "space-between",
				alignItems: "center",
				position: "relative",
				margin: theme.spacing.sm,
				// backgroundColor: "yellow"
			}}
		>
			<Flex sx={(theme) => ({
				gap: theme.spacing.xs,
				alignItems: "center",
			})}>
				<Avatar
					radius="xl"
					color={color}
				>{getNameInitials(props.user.fullname)}</Avatar>
				<Text
					sx={{
						fontWeight: 500,
						fontSize: theme.fontSizes.sm,
					}}
				>
					{props.user.fullname}
				</Text>
			</Flex>
			<Text sx={(theme) => ({
				fontSize: theme.fontSizes.xs,
				fontStyle: "italic",
				color: theme.colors.gray[6],
			})}>{moment(props.time).fromNow()}</Text>
		</Flex>
	);
};

export default FeedItemMeta;
