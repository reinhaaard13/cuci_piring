import React, { useState, useEffect} from "react";

import {
	Box,
	Text,
	useMantineTheme,
	Card,
	Grid,
	Badge,
	Loader,
} from "@mantine/core";
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
	const { colorScheme } = useColorScheme();

	const {
		data: familyData,
		isSuccess,
		isLoading,
	} = useQuery("Family", FamilyApi.getMyFamily);

	const isFamilyFound = isSuccess && familyData?.data?.length > 0;

	return (
		<Box
			sx={{
				marginTop: theme.spacing.md,
			}}
		>
			<Text>Keluarga Saya</Text>

			<Grid>
				{isLoading ? (
					<Grid.Col
						span={12}
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: 100,
							flexDirection: "column",
						}}
					>
						<Loader size={"md"} color={"teal"} />
						{/* <Text
							sx={(themes) => ({
								fontWeight: 500,
							})}
						>
							Sedang memuat...
						</Text> */}
						<SedangMemuatText />
					</Grid.Col>
				) : isFamilyFound ? (
					familyData.data.map((family: IFamily) => (
						<Grid.Col md={6} key={family.familyCode}>
							<Card
								withBorder
								component={Link}
								href={`/keluarga/${family.familyCode}`}
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
					))
				) : (
					<Grid.Col
						span={12}
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: 100,
						}}
					>
						<Text sx={{ opacity: "50%" }}>Belum bergabung dengan keluarga</Text>
					</Grid.Col>
				)}
			</Grid>
		</Box>
	);
};

let interval: any = null
const SedangMemuatText = () => {
	const [titik, setTitik] = useState("...")

	useEffect(() => {
		interval = setInterval(() => {
			if (titik.length === 3) {
				setTitik(".")
			} else {
				setTitik(titik + ".")
			}
		}, 500)

		return () => {
			clearInterval(interval)
		}
	}, [titik])

	return (
		<Text
			sx={(themes) => ({
				fontWeight: 500,
			})}
		>
			Sedang memuat{titik}
		</Text>
	);
};

export default MyKeluargaSection;
