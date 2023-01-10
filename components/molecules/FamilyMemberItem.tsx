import React, { useMemo } from "react";

import {
	Flex,
	useMantineTheme,
	Avatar,
	Box,
	Text,
	ActionIcon,
} from "@mantine/core";
import { BsThreeDotsVertical } from "react-icons/bs";

import getRandomColor from "../../utils/getRandomColor";
import getNameInitials from "../../utils/getNameInitial";
import useColorScheme from "../../hooks/useColorScheme";

type Props = {
  user: {
    _id: string;
    fullname: string;
    username: string;
  }
};

const FamilyMemberItem = (props: Props) => {
	const theme = useMantineTheme();
  const {colorScheme} = useColorScheme()

  const color = useMemo(() => getRandomColor(), [])
  const nameInitial = useMemo(() => getNameInitials(props.user.fullname), [props.user.fullname])

	return (
		<Flex
			sx={{
				padding: theme.spacing.sm,
				borderRadius: theme.radius.md,
				alignItems: "center",
				justifyContent: "space-between",
				border: "1px solid",
        borderColor: colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[3],
			}}
		>
			<Flex
				sx={{
					gap: theme.spacing.sm,
					alignItems: "center",
				}}
			>
				<Avatar color={color} radius="lg">
					{nameInitial}
				</Avatar>

				<Box>
					<Text fw={600} lh={1.2}>
						{props.user.fullname}
					</Text>
					<Text size="sm" lh={1.2} color={theme.colors.gray[6]}>
						{props.user.username}
					</Text>
				</Box>
			</Flex>
			<ActionIcon>
				<BsThreeDotsVertical />
			</ActionIcon>
		</Flex>
	);
};

export default FamilyMemberItem;
