import React from "react";

import { Box, Text, Skeleton } from "@mantine/core";
import Image from "next/image";

import HeroImage from "../../public/house.png";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import FamilyApi from "../../services/FamilyApi";
import spoilMembersNames from "../../utils/spoilMembersNames";

type Props = {};

const HeroKeluarga = (props: Props) => {
	const router = useRouter();

	const { data, isSuccess } = useQuery(
		["Family", router.query.familyCode],
		() => FamilyApi.getPostsByFamilyCode(router.query.familyCode as string)
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
				height: 100,
			})}
		>
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
						{spoilMembersNames(data?.data.members)}
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
		</Box>
	);
};

export default HeroKeluarga;
