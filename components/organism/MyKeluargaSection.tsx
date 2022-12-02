import React from "react";

import { Box, Text, useMantineTheme, Card, Grid, Badge } from "@mantine/core";
import Image from "next/image";
import { useQuery } from "react-query";
import FamilyApi from "../../services/FamilyApi";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import useColorScheme from "../../hooks/useColorScheme";
import { IFamily } from "../../models/Family";

type Props = {};

const MyKeluargaSection = (props: Props) => {
	const theme = useMantineTheme();
	const isMobile = useMediaQuery("(max-width: 768px)");
	const { colorScheme } = useColorScheme();

	const {
		data: familyData,
		isSuccess,
		isFetching,
		isError,
	} = useQuery("Family", FamilyApi.getMyFamily);

	const isFamilyFound = isSuccess && familyData?.data?.length > 0;

	let cardConfig = {};
	if (isFamilyFound) {
		cardConfig = {
			component: Link,
			href: "/keluarga/1",
		};
	}

	return (
		<Box
			sx={{
				marginTop: theme.spacing.md,
			}}
		>
			<Text>Keluarga Saya</Text>

			<Grid>
				{isFamilyFound ? 
					familyData.data.map((family: IFamily) => (
						<Grid.Col md={6} key={family.familyCode}>
							<Card
								withBorder
								{...cardConfig}
								sx={{
									display: "flex",
									":hover": {
										backgroundColor:
											colorScheme === "dark"
												? theme.colors.dark[7]
												: theme.colors.gray[1],
									},
								}}
								radius="md"
							>
								{!isFamilyFound && (
									<Text sx={{ textAlign: "center" }}>
										Belum bergabung dengan keluarga
									</Text>
								)}
								<Card.Section
									sx={{
										display: "flex",
										alignItems: "center",
										gap: theme.spacing.sm,
									}}
								>
									{isFamilyFound && (
										<>
											<Box
												sx={{
													position: "relative",
													height: 100,
													width: 150,
												}}
											>
												<Image
													src={family.image}
													alt={family.familyName}
													fill={true}
													style={{ objectFit: "cover" }}
												/>
											</Box>

											<Box>
												<Badge size={"md"} variant="dot">
													{family.familyCode}
												</Badge>
												<Text size={"md"} weight={600}>
													{family.familyName}
												</Text>
											</Box>
										</>
									)}
								</Card.Section>
							</Card>
						</Grid.Col>
					)) : (
						<Grid.Col span={12} sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: 100
						}}>
							<Text sx={{ opacity: "50%" }}>Belum bergabung dengan keluarga</Text>
						</Grid.Col>
					)}
			</Grid>
		</Box>
	);
};

export default MyKeluargaSection;
