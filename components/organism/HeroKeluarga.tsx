import React from "react";

import { Box, Text } from "@mantine/core";
import Image from "next/image";

import HeroImage from "../../public/house.png";

type Props = {};

const HeroKeluarga = (props: Props) => {
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
				Sweetdream Family
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
				Daniel, Marlin, +2 people
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
