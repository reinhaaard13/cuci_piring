import React from "react";

import { Box, Text, Skeleton, Badge, ActionIcon } from "@mantine/core";
import { IoInformationCircleOutline } from "react-icons/io5"
import Image from "next/image";

import HeroImage from "../../public/house.png";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import FamilyApi from "../../services/FamilyApi";
import spoilMembersNames from "../../utils/spoilMembersNames";
import PostApi from "../../services/PostApi";
import { ApiResponse } from "../../types/global";
import { FamilyMembers, IFamily } from "../../models/Family";
import Link from "next/link";

type Props = {};

const HeroKeluarga = (props: Props) => {
	const { query } = useRouter();

	const { data, isSuccess } = useQuery<ApiResponse<IFamily>>(
		["Family", query.familyCode],
		() => PostApi.getFamilyWithPosts(query.familyCode as string)
	);

	return (
		<Box
			sx={(theme) => ({
				padding: theme.spacing.md,
				maxWidth: theme.breakpoints.lg,
				background: theme.fn.linearGradient(
					225,
					"rgb(255,209,67)",
					"rgb(255,145,83)"
				),
				borderRadius: theme.radius.md,
				position: "relative",
				marginTop: 50,
				display: "flex",
				flexDirection: "column",
				justifyContent: "flex-end",
				minHeight: 100,
			})}
		>
			<Skeleton visible={!isSuccess}>
				<Badge
					w={"fit-content"}
					variant="light"
					color={"orange"}
					opacity={"80%"}
					size={"xs"}
				>
					#{data?.data.familyCode}
				</Badge>
			</Skeleton>
			<Text
				sx={(theme) => ({
					fontSize: theme.fontSizes.xl,
					color: "white",
					lineHeight: 1.15,
					alignSelf: "start",
					justifySelf: "end",
					maxWidth: "70%",
					fontWeight: 500,
					zIndex: 1,
				})}
			>
				<Skeleton visible={!isSuccess}>{data?.data.familyName}</Skeleton>
			</Text>
			<Text
				sx={(theme) => ({
					fontSize: theme.fontSizes.xs,
					marginTop: 2,
					color: "white",
					lineHeight: 1.15,
					opacity: 0.6,
				})}
			>
				{data?.data.members && (
					<Skeleton visible={!isSuccess}>
						{spoilMembersNames(data?.data.members as FamilyMembers[])}
					</Skeleton>
				)}
			</Text>

			<Image
				src={HeroImage}
				alt="Hero Image"
				height={125}
				style={{
					position: "absolute",
					right: 10,
					bottom: 20,
				}}
			/>

			<ActionIcon
				sx={theme => ({
					position: "absolute",
					right: theme.spacing.xs,
					bottom: theme.spacing.xs,
					color: "white",

					"&:hover": {
						backgroundColor: "rgba(255,255,255,0.2)"
					}
				})}
				radius="lg"
				variant="subtle"
				component={Link}
				href={`/keluarga/${query.familyCode}/detail`}
			>
				<IoInformationCircleOutline />
			</ActionIcon>
		</Box>
	);
};

export default HeroKeluarga;
