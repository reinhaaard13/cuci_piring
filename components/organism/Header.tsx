import React from "react";

import { useMantineTheme } from "@mantine/styles";
import { Flex, Text, ActionIcon, Box, Avatar, Menu } from "@mantine/core";
import { TbMoonStars } from "react-icons/tb";
import { IoEllipsisVertical } from "react-icons/io5";
import useColorScheme from "../../hooks/useColorScheme";
import getNameInitials from "../../utils/getNameInitial";
import ActionMenu from "../molecules/ActionMenu";
import Link from "next/link";

type Props = {
	isAuthenticated: boolean;
	name?: string;
};

const Header = (props: Props) => {
	const { toggleColorScheme } = useColorScheme();

	return (
		<Flex
			sx={(theme) => ({
				justifyContent: "space-between",
				alignItems: "center",
				padding: "12px",
				marginTop: "16px",
				marginBottom: "16px",
				backgroundColor:
					theme.colorScheme === "light" ? "white" : theme.colors.dark[6],
				borderRadius: theme.radius.md,
				boxShadow: theme.shadows.sm,
				position: "sticky",
				top: 10,
				zIndex: 100,
			})}
		>
			<Link href={"/"} style={{ textDecoration: "none", color: "unset" }}>
				<Text
					size={24}
					fw={"bold"}
					display="inline-flex"
					sx={{ userSelect: "none" }}
				>
					cuci<Text fw={"normal"}>piring</Text>
				</Text>
			</Link>
			<Box
				sx={(theme) => ({
					textAlign: "right",
				})}
			>
				<Flex gap={8} align={"center"}>
					<ActionIcon size={"lg"} variant="light" onClick={toggleColorScheme}>
						<TbMoonStars />
					</ActionIcon>
					<ActionMenu />
					{props.isAuthenticated && (
						<Avatar color="cyan" radius={"xl"}>
							{getNameInitials(props.name!)}
						</Avatar>
					)}
				</Flex>
			</Box>
		</Flex>
	);
};

export default Header;
