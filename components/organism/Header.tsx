import React from "react";

import { useMantineTheme } from "@mantine/styles";
import { Flex, Text, ActionIcon, Box, Avatar } from "@mantine/core";
import { TbMoonStars } from "react-icons/tb";
import { IoEllipsisVertical } from "react-icons/io5";

type Props = {};

const Header = (props: Props) => {
	const theme = useMantineTheme();

	return (
		<Flex
			sx={(theme) => ({
				justifyContent: "space-between",
				alignItems: "center",
				padding: "12px",
				margin: "16px",
				maxWidth: theme.breakpoints.lg,
				backgroundColor:
					theme.colorScheme === "light" ? "white" : theme.colors.dark[6],
				borderRadius: theme.radius.md,
				boxShadow: theme.shadows.sm,
				[theme.fn.largerThan("lg")]: {
					margin: "16px auto",
				},
			})}
		>
			<Text
				size={24}
				fw={"bold"}
				display="inline-flex"
				sx={{ userSelect: "none" }}
			>
				cuci<Text fw={"normal"}>piring</Text>
			</Text>
			<Box
				sx={(theme) => ({
					textAlign: "right",
				})}
			>
				<Flex gap={8} align={"center"}>
					<ActionIcon size={"lg"} variant="light">
						<TbMoonStars />
					</ActionIcon>
					<ActionIcon size={"lg"} variant="light">
						<IoEllipsisVertical />
					</ActionIcon>
					<Avatar color="cyan" radius={"xl"} />
				</Flex>
			</Box>
		</Flex>
	);
};

export default Header;
