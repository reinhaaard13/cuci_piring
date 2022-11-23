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

type Props = {
	toggleMode: () => void;
};

const LoginForm = (props: Props) => {
	const theme = useMantineTheme();

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
				shadow={"sm"}
				radius="md"
				p={"md"}
				bg={theme.colorScheme === "light" ? "#fff" : theme.colors.dark[5]}
				withBorder
			>
				<TextInput
					label="Username"
					sx={{ marginBottom: theme.spacing.sm }}
					radius="md"
				/>
				<PasswordInput
					label="Password"
					sx={{ marginBottom: theme.spacing.sm }}
					radius="md"
				/>

				<Button radius={"md"} sx={{ marginBottom: theme.spacing.md }}>
					Login
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
