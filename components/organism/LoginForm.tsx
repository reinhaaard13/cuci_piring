import React from "react";

import {
	Paper,
	useMantineTheme,
	Text,
	TextInput,
	PasswordInput,
	Card,
	Button,
	Anchor,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useForm, Controller } from "react-hook-form";
import { LoginPayload } from "../../types/payload";
import AuthApi from "../../services/AuthApi";
import axios, { isAxiosError } from "../../services/axios";
import { ApiResponse } from "../../types/global";
import Token from "../../services/Token";
import { useRouter } from "next/router";

type Props = {
	toggleMode: () => void;
};

const LoginForm = (props: Props) => {
	const theme = useMantineTheme();
	const router = useRouter()

	const {
		control,
		formState: { isDirty, isValid, errors, isSubmitting },
		handleSubmit,
		reset,
		setError,
	} = useForm<LoginPayload>({
		defaultValues: {
			username: "",
			password: "",
		},
		mode: "onChange",
	});

	const submitHandler = async (values: LoginPayload) => {
		try {
			const response = await AuthApi.login(values);

			if (response.status === "success") {
				Token.setToken(response.data.accessToken);
				showNotification({
					title: "Berhasil masuk",
					message: "Selamat datang kembali!",
					color: "green",
				});
				reset();

				axios.defaults.headers.common["Authorization"] = `Bearer ${Token.getToken()}`
				
				router.replace("/")
			}
		} catch (err) {
			if (!isAxiosError<ApiResponse>(err)) return;
			if (!err.response) return;

			const {
				response: {
					data: { message },
				},
			} = err;

			switch (message) {
				case "User not found!":
					setError("username", {
						message: "User tidak ditemukan",
					});
					break;
				case "Invalid credentials":
					setError("password", {
						message: "Password tidak sesuai",
					});
					break;
				default:
					showNotification({
						title: "Error",
						message: "Terjadi kesalahan",
						color: "red",
					});
					break;
			}
		}
	};

	return (
		<>
			<Paper
				sx={(theme) => ({
					background: theme.fn.linearGradient(
						250,
						"rgb(37,145,251)",
						"rgb(0,7,128)"
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
					Senang bertemu denganmu lagi!
				</Text>
			</Paper>

			<Paper
				component="form"
				onSubmit={handleSubmit(submitHandler)}
				shadow={"sm"}
				radius="md"
				p={"md"}
				bg={theme.colorScheme === "light" ? "#fff" : theme.colors.dark[5]}
				withBorder
			>
				<Controller
					name="username"
					control={control}
					rules={{
						required: "Username tidak boleh kosong",
					}}
					render={({ field: { onChange, value } }) => (
						<TextInput
							label="Username"
							sx={{ marginBottom: theme.spacing.sm }}
							radius="md"
							name="username"
							value={value}
							onChange={onChange}
							error={errors.username?.message}
						/>
					)}
				/>

				<Controller
					name="password"
					control={control}
					rules={{
						required: "Password tidak boleh kosong",
					}}
					render={({ field: { onChange, value } }) => (
						<PasswordInput
							label="Password"
							sx={{ marginBottom: theme.spacing.sm }}
							radius="md"
							name="password"
							value={value}
							onChange={onChange}
							error={errors.password?.message}
						/>
					)}
				/>

				<Button
					type="submit"
					disabled={!isValid || !isDirty}
					loading={isSubmitting}
					radius={"md"}
					sx={{ marginBottom: theme.spacing.md }}
				>
					Masuk
				</Button>

				<Text sx={{ fontSize: theme.fontSizes.sm }}>
					{"Belum punya akun?"}{" "}
					<Anchor component="button" type="button" onClick={props.toggleMode}>
						Daftar sekarang
					</Anchor>
				</Text>
			</Paper>
		</>
	);
};

export default LoginForm;
