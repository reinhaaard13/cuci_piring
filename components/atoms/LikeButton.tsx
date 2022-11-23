import React from "react";

import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { Box, Text, useMantineTheme, UnstyledButton } from "@mantine/core";

type Props = {};

const LikeButton = (props: Props) => {
	const theme = useMantineTheme();

	return (
		<UnstyledButton
			sx={{
				position: "absolute",
				top: 0,
				right: 0,
				color: theme.colors.gray[5],
				transition: "all 0.1s ease-in-out",
				textAlign: "center",
				"&:hover": {
					color: theme.colors.red[5],
				},
			}}
		>
			<IoIosHeartEmpty />
			<Text sx={{ fontSize: theme.fontSizes.xs, lineHeight: "unset" }}>
				299
			</Text>
		</UnstyledButton>
	);
};

export default LikeButton;
