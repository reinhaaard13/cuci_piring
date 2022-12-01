import React, { useState, useRef } from "react";
import {
	Modal,
	Button,
	TextInput,
	Textarea,
	useMantineTheme,
	FileInput,
	Box,
	Flex,
	Input,
} from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import { IoImageOutline } from "react-icons/io5";
import { CreateFamilyPayload } from "../../types/payload";
import FamilyApi from "../../services/FamilyApi";
import { showNotification } from "@mantine/notifications";

type Props = {};

const DUMMY_IMAGE =
	"https://occ-0-3011-114.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABccy9cHO9eTuoKhAaLJ8RdOlomk3aYmdW5U7t-4ImBCCV9Rn6d1PYwLbfmUwWA81U1NZV0_RTcyEwe8IOCovkB51uXYq.jpg?r=751";

const CreateKeluargaForm = (props: Props) => {
	const [opened, setOpened] = useState<boolean>(false);
	const theme = useMantineTheme();
	const isMobile = useMediaQuery("(max-width: 480px)");
	const fileUploadRef = useRef<HTMLInputElement>(null);

	const {
		control,
		formState: { errors, isDirty, isSubmitting, isValid },
		handleSubmit,
		reset,
		watch,
		setValue,
	} = useForm<CreateFamilyPayload>({
		defaultValues: {
			familyName: "",
			familyBio: "",
			image: undefined,
		},
		mode: "onBlur",
	});

	const changeImageHandler: React.ChangeEventHandler<HTMLInputElement> = (
		e
	) => {
		const image = e.target.files?.[0];
		if (image) {
			setValue("image", image);
		} else {
			setValue("image", undefined);
		}
	};

	const submitHandler = async (values: CreateFamilyPayload) => {
		const response = await FamilyApi.createFamily(values);

		if (response.status === "success") {
			reset();
			setOpened(false);
			showNotification({
				title: "Berhasil membuat keluarga",
				message: `Keluarga ${values.familyName} berhasil dibuat!`,
			})
		}
	}

	return (
		<>
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title="Buat keluarga baru"
				fullScreen={isMobile}
				centered
			>
				<form onSubmit={handleSubmit(submitHandler)}>
					<Box
						sx={(theme) => ({
							position: "relative",
							height: 120,
							borderRadius: theme.radius.md,
							overflow: "hidden",
							marginBottom: theme.spacing.sm,
						})}
					>
						<Image
							src={
								watch("image")
									? URL.createObjectURL(watch("image")!)
									: DUMMY_IMAGE
							}
							fill={true}
							alt="Keluarga"
							style={{ objectFit: "cover" }}
						/>

						<Button
							size="xs"
							radius="md"
							variant="white"
							color={theme.colorScheme === "dark" ? "dark" : "white"}
							sx={(theme) => ({
								position: "absolute",
								bottom: theme.spacing.sm,
								right: theme.spacing.sm,
								opacity: 0.8,
							})}
							leftIcon={<IoImageOutline />}
							placeholder="Change Image"
							onClick={() => fileUploadRef.current?.click()}
						>
							Change Image
						</Button>

						<input
							type="file"
							name="image"
							ref={fileUploadRef}
							onChange={changeImageHandler}
							style={{ display: "none" }}
						/>
					</Box>

					<Controller
						control={control}
						name="familyName"
						rules={{ required: "Nama keluarga harus diberikan." }}
						render={({ field: { onChange, value, onBlur } }) => (
							<TextInput
								label="Nama Keluarga"
								placeholder="Masukkan nama keluarga anda"
								name="namaKeluarga"
								onBlur={onBlur}
								onChange={onChange}
								value={value}
								error={errors.familyName?.message}
								withAsterisk
								mb={theme.spacing.xs}
								radius="md"
							/>
						)}
					/>

					<Controller
						control={control}
						name="familyBio"
						render={({ field: { onChange, value, onBlur } }) => (
							<Textarea
								label="Bio Keluarga"
								placeholder="Masukkan bio"
								name="bioKeluarga"
								onBlur={onBlur}
								onChange={onChange}
								value={value}
								error={errors.familyBio?.message}
								radius="md"
							/>
						)}
					/>

					<Button type="submit" radius="md" sx={(theme) => ({
						marginTop: theme.spacing.md,
					})} disabled={!isDirty || !isValid} loading={isSubmitting}>Submit</Button>
				</form>
			</Modal>
			
			<Flex justify={'center'}>
				<Button radius="md" onClick={() => setOpened(true)}>Buat Keluarga Baru</Button>
			</Flex>
		</>
	);
};

export default CreateKeluargaForm;
