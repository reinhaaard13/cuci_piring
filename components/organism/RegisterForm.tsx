import React from "react";

import {
	useMantineTheme,
	Paper,
	Text,
	TextInput,
	PasswordInput,
	Button,
	Anchor,
} from "@mantine/core";

import { useForm, Controller } from "react-hook-form";
import { RegisterPayload } from "../../types/payload";
import { showNotification } from "@mantine/notifications";
import AuthApi from "../../services/AuthApi";
import { useRouter } from "next/router";

type Props = {
	toggleMode: () => void;
};

const RegisterForm = (props: Props) => {
	const theme = useMantineTheme();
	const router = useRouter()

	const {
		control,
		formState: { isDirty, errors, isValid, isSubmitting },
		handleSubmit,
		setError,
		reset,
		watch,
		trigger,
		getValues,
	} = useForm<RegisterPayload>({
		defaultValues: {
			username: "",
			fullname: "",
			password: "",
			password_confirmation: "",
		},
		mode: "onChange",
	});

	const submitHandler = async (values: RegisterPayload) => {
		try {
			await AuthApi.register(values);
			
			showNotification({
				title: "Pendaftaran berhasil",
				message: `Akun ${getValues("fullname")} berhasil didaftarkan. Silahkan login.`,
				color: "teal",
			})
			reset();

			// Back to login mode
			props.toggleMode()
		} catch {
			showNotification({
				title: "Pendaftaran gagal",
				message: "Akun anda gagal didaftarkan. Silahkan coba lagi.",
				color: "red",
			})
		}
	};

	return (
		<>
			<Paper
				sx={(theme) => ({
					background: theme.fn.linearGradient(
						250,
						"rgb(37,230,251)",
						"rgb(0,150,128)"
					),
					padding: `${theme.spacing.md}px`,
					marginBottom: theme.spacing.md,
				})}
				radius="md"
			>
				<Text weight={500} color={"white"} size="xl">
					Hi, Selamat Datang!
				</Text>
				<Text c={"white"} size={"sm"} opacity={0.7}>
					Senang bertemu dengamu!
				</Text>
			</Paper>

			<Paper
				shadow={"sm"}
				component="form"
				onSubmit={handleSubmit(submitHandler)}
				radius="md"
				p={"md"}
				bg={theme.colorScheme === "light" ? "#fff" : theme.colors.dark[5]}
				withBorder
			>
				<Controller
					control={control}
					name="fullname"
					rules={{
						required: "Nama lengkap harus diisi",
					}}
					render={({ field: { onChange, value } }) => (
						<TextInput
							label="Nama Lengkap"
							sx={{ marginBottom: theme.spacing.sm }}
							radius="md"
							name="fullname"
							onChange={onChange}
							value={value}
							error={errors.fullname?.message}
						/>
					)}
				/>

				<Controller
					control={control}
					name="username"
					rules={{
						required: "Username harus diisi",
					}}
					render={({ field: { onChange, value } }) => (
						<TextInput
							label="Username"
							sx={{ marginBottom: theme.spacing.sm }}
							radius="md"
							name="username"
							onChange={(e) => onChange(e.target.value.trim())}
							value={value}
							error={errors.username?.message}
						/>
					)}
				/>

				<Controller
					control={control}
					name="password"
					rules={{
						required: "Password harus diisi",
					}}
					render={({ field: { onChange, value } }) => (
						<PasswordInput
							label="Password"
							sx={{ marginBottom: theme.spacing.sm }}
							radius="md"
							name="password"
							onChange={onChange}
							value={value}
							error={errors.password?.message}
						/>
					)}
				/>

				<Controller
					control={control}
					name="password_confirmation"
					rules={{
						required: "Password harus diisi",
						validate: {
							notMatch: (value) =>
								value === watch("password") || "Password tidak sama",
						},
					}}
					render={({ field: { onChange, value } }) => (
						<PasswordInput
							label="Konfirmasi Password"
							sx={{ marginBottom: theme.spacing.sm }}
							radius="md"
							name="password_confirmation"
							onChange={onChange}
							value={value}
							error={errors.password_confirmation?.message}
						/>
					)}
				/>

				<Button
					disabled={!isDirty || !isValid}
					radius={"md"}
					type="submit"
					loading={isSubmitting}
					sx={{ marginBottom: theme.spacing.md }}
				>
					Daftar
				</Button>

				<Text sx={{ fontSize: theme.fontSizes.sm }}>
					{"Sudah punya akun?"}{" "}
					<Anchor component="button" type="button" onClick={props.toggleMode}>
						Login sekarang
					</Anchor>
				</Text>
			</Paper>
		</>
	);
};

export default RegisterForm;
