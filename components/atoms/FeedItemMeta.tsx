import React from "react";

import { Avatar, Flex, Text, useMantineTheme } from "@mantine/core";
import moment from "moment";

type Props = {
	user: any;
	time: string;
};

const FeedItemAuthor = (props: Props) => {
	const theme = useMantineTheme();

	return (
		<Flex
			sx={{
				width: "100%",
				marginTop: theme.spacing.xs,
				paddingTop: theme.spacing.xs,
				justifyContent: "space-between",
				alignItems: "center",
				position: "relative",
				"::before": {
					content: '""',
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: 1,
					backgroundColor: theme.colors.gray[6],
				},
			}}
		>
			<Flex sx={(theme) => ({
				gap: theme.spacing.xs,
				alignItems: "center",
			})}>
				<Avatar
					size={`sm`}
					radius="xl"
					src="https://media-exp1.licdn.com/dms/image/D5603AQH9vruzCj3Wjw/profile-displayphoto-shrink_800_800/0/1648229907948?e=2147483647&v=beta&t=Sl2-xSVCLmzoNokd1qbyW70JdTOOCK-epw4TnGxaCFc"
				/>
				<Text
					sx={{
						fontSize: theme.fontSizes.xs,
						fontStyle: "italic",
						color: theme.colors.gray[6],
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

export default FeedItemAuthor;