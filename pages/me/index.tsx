import React, { useMemo } from "react";

import { Card, Text, Avatar } from "@mantine/core";
import useUser from "../../hooks/useUser";
import getNameInitials from "../../utils/getNameInitial";
import getRandomColor from "../../utils/getRandomColor";

type Props = {};

const ProfilePage = (props: Props) => {
	const { user } = useUser();

	const color = useMemo(() => getRandomColor(), []);

	return (
		<>
			<Card
				radius={"md"}
				sx={(theme) => ({
					background: theme.fn.linearGradient(
						45,
						"rgb(182, 244, 146)",
						"rgb(51, 139, 147)"
					),
          height: 60,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          overflow: "inherit",
          marginBottom: theme.spacing.md * 3
				})}
			>
				<Avatar color={color} size={'xl'} sx={(theme) => ({
          borderRadius: "50%",
          position: "absolute",
          bottom: -40,
          backgroundColor: theme.colorScheme === "light" ? theme.white : theme.colors.dark[7],
          border: `3px solid ${theme.colorScheme === "light" ? theme.white : theme.colors.dark[7]}`,
          boxShadow: theme.shadows.sm
        })}>
					{getNameInitials(user?.fullname as string)}
				</Avatar>
			</Card>
			<Text ta={"center"} fw={600}>{user?.fullname}</Text>
			<Text ta={"center"} color={"gray"} size="xs" fs={"italic"}>#{user?._id}</Text>
		</>
	);
};

export default ProfilePage;
