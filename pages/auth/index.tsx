import React, { useState } from "react";
import LoginForm from "../../components/organism/LoginForm";
import RegisterForm from "../../components/organism/RegisterForm";
import Head from "next/head";

type Props = {};

const AuthPage = (props: Props) => {
	const [isLoginMode, setIsLoginMode] = useState(true);

	const toggleMode = () => setIsLoginMode((prevState) => !prevState);

	if (isLoginMode) {
		return (
			<>
				<Head>
					<title>Login | Cuci Piring</title>
				</Head>
				<LoginForm toggleMode={toggleMode} />
			</>
		);
	} else {
		return (
			<>
				<Head>
					<title>Daftar | Cuci Piring</title>
				</Head>
				<RegisterForm toggleMode={toggleMode} />
			</>
		);
	}
};

export default AuthPage;
