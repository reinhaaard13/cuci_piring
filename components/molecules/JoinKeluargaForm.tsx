import React, { useState } from "react";

import {
	Box,
	Button,
	Flex,
	Input,
	Text,
	useMantineTheme,
	Modal,
	Avatar,
	Card,
	Skeleton,
} from "@mantine/core";
import { CgHashtag } from "react-icons/cg";
import Image from "next/image";

type Props = {};

const JoinKeluargaForm = (props: Props) => {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	const [imageIsLoading, setImageIsLoading] = useState(true);

	return (
		<>
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title="Hasil Pencarian Keluarga"
				radius={theme.radius.md}
				overlayBlur={1}
				centered
			>
				<Card
					sx={(theme) => ({
						padding: theme.spacing.sm,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					})}
					withBorder
				>
					<Card.Section
						sx={(theme) => ({
							position: "relative",
							height: 128,
							width: "120%",
						})}
					>
						{imageIsLoading && <Skeleton height={"100%"} width={"100%"} />}
						<Image
							src="https://occ-0-3011-114.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABccy9cHO9eTuoKhAaLJ8RdOlomk3aYmdW5U7t-4ImBCCV9Rn6d1PYwLbfmUwWA81U1NZV0_RTcyEwe8IOCovkB51uXYq.jpg?r=751"
							alt="Family"
							fill
							style={{ objectFit: "cover" }}
							onLoadStart={() => setImageIsLoading(true)}
							onLoad={() => setImageIsLoading(false)}
						/>
					</Card.Section>
					<Text
						sx={(theme) => ({
							fontWeight: "bold",
							marginTop: theme.spacing.xs,
						})}
					>
						Sweetdream Family
					</Text>

					<Flex align={"center"}>
						<Avatar.Group>
							<Avatar
								src="https://avatars.githubusercontent.com/u/2059352?v=4"
								radius={"xl"}
								size="sm"
							/>
							<Avatar
								src="https://avatars.githubusercontent.com/u/2059353?v=4"
								radius={"xl"}
								size="sm"
							/>
							<Avatar
								src="https://avatars.githubusercontent.com/u/2059359?v=4"
								radius={"xl"}
								size="sm"
							/>
						</Avatar.Group>
						<Text
							sx={(theme) => ({
								fontSize: theme.fontSizes.xs,
							})}
						>
							Daniel, Marlin, +2 people
						</Text>
					</Flex>

					<Button
						size="xs"
						mt={4}
						variant="light"
						style={{
							width: "fit-content",
							alignSelf: "flex-end",
						}}
					>
						Gabung
					</Button>
				</Card>
			</Modal>

			<Box sx={(theme) => ({
				marginTop: theme.spacing.md,
			})}>
				<Text>Masuk Keluarga dengan Kode</Text>

				<Flex
					sx={{
						alignItems: "center",
						gap: theme.spacing.xs,
					}}
				>
					<Input
						icon={<CgHashtag />}
						radius={"md"}
						style={{ marginTop: 4, flexGrow: 1 }}
						placeholder="6 digit kode keluarga"
						maxLength={6}
					/>
					<Button radius={"md"} onClick={() => setOpened(true)}>
						Cari
					</Button>
				</Flex>
				<Text sx={{ fontSize: theme.fontSizes.xs, opacity: 0.6 }}>
					Minta kode keluarga kepada pembuat keluarga
				</Text>
			</Box>
		</>
	);
};

export default JoinKeluargaForm;
