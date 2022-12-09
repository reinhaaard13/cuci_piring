import React from "react";
import { Flex, Avatar, Text } from "@mantine/core";
import { Types } from "mongoose";
import { FamilyMembers } from "../../models/Family";
import getNameInitials from "../../utils/getNameInitial";
import spoilMembersNames from "../../utils/spoilMembersNames";
import useUser from "../../hooks/useUser";
import getRandomColor from "../../utils/getRandomColor";

type Props = {
	members: FamilyMembers[];
	joined: boolean;
};

const MemberSpoiler = (props: Props) => {
	const { user } = useUser();

	let members = props.members;

	const fixedMembers = [...members.filter((member) => member._id !== user!._id)];
	let me = members.find((member) => member._id === user!._id);
	if (me) {
		me.alias = "Kamu";
		fixedMembers.unshift(me);
	}

	return (
		<>
			<Flex align={"center"} gap={6}>
				<Avatar.Group>
					{props.members.map((member) => (
						<Avatar
							radius={"xl"}
							size="sm"
							color={getRandomColor()}
							key={member._id as string}
						>
							{getNameInitials(member.fullname)}
						</Avatar>
					))}
				</Avatar.Group>
				<Text
					sx={(theme) => ({
						fontSize: theme.fontSizes.xs,
					})}
				>
					{spoilMembersNames(fixedMembers)}
				</Text>
			</Flex>
		</>
	);
};

export default MemberSpoiler;
