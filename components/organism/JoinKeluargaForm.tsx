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
import { useMutation, useQuery, useQueryClient } from "react-query";
import FamilyApi from "../../services/FamilyApi";
import { ApiResponse } from "../../types/global";
import { IFamily } from "../../models/Family";
import MemberSpoiler from "../molecules/MemberSpoiler";
import UserApi from "../../services/UserApi";
import { showNotification } from "@mantine/notifications";

type Props = {};

const JoinKeluargaForm = (props: Props) => {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	const [imageIsLoading, setImageIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const queryClient = useQueryClient();

	const handleOpen = () => setOpened(true);
	const handleClose = () => setOpened(false);

	const { data, isSuccess, isError, isFetching } = useQuery<
		ApiResponse<IFamily>
	>(["FamilySearch", { searchQuery }], FamilyApi.getFamilyByCode, {
		enabled: opened,
	});

	const { data: userData } = useQuery(["User"], UserApi.getAuthenticatedUser);

	const joinKeluargaMutation = useMutation(FamilyApi.joinFamily, {
		onSuccess: (data) => {
			handleClose();
			showNotification({
				title: "Berhasil bergabung",
				message: `Kamu telah bergabung dengan ${data.data.familyName}`,
			});
			queryClient.invalidateQueries("Family");
		},
	});

	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const joinKeluargaHandler = () => {
		joinKeluargaMutation.mutate({
			familyCode: data?.data.familyCode as string,
			userId: userData?._id as string,
		});
	};

	const isJoined = data?.data?.members.some(
		(member) => member._id === userData?._id
	);

	return (
		<>
			<Box
				sx={(theme) => ({
					marginTop: theme.spacing.md,
				})}
			>
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
						onChange={inputChangeHandler}
					/>
					<Button
						radius={"md"}
						onClick={handleOpen}
						disabled={searchQuery.trim().length < 6}
					>
						Cari
					</Button>
				</Flex>
				<Text sx={{ fontSize: theme.fontSizes.xs, opacity: 0.6 }}>
					Minta kode keluarga kepada pembuat keluarga
				</Text>
			</Box>

			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title="Hasil Pencarian Keluarga"
				radius={theme.radius.md}
				overlayBlur={1}
				centered
			>
				{isFetching && !data?.data && <Skeleton height={40} radius="md" />}
				{isSuccess && !data?.data && (
					<Text
						sx={(theme) => ({
							textAlign: "center",
							opacity: "50%",
							fontSize: theme.fontSizes.sm,
							margin: theme.spacing.md,
						})}
					>
						Kode keluarga tidak ditemukan :(
					</Text>
				)}
				{isSuccess && data?.data && (
					<Card
						sx={(theme) => ({
							padding: theme.spacing.sm,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						})}
						radius="md"
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
								src={data.data.image}
								alt={data.data.familyName}
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
							{data.data.familyName}
						</Text>

						<MemberSpoiler
							members={data.data.members}
							joined={isJoined || false}
						/>

						<Button
							size="xs"
							radius={"md"}
							mt={4}
							variant="light"
							style={{
								width: "fit-content",
								alignSelf: "flex-end",
							}}
							onClick={joinKeluargaHandler}
							disabled={isJoined}
						>
							{isJoined ? "Sudah Bergabung" : "Gabung"}
						</Button>
					</Card>
				)}
			</Modal>
		</>
	);
};

export default JoinKeluargaForm;
