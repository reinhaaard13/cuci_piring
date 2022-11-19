import React from "react";
import Header from "../organism/Header";

type Props = {
	children: React.ReactNode;
};

const MainLayout = (props: Props) => {
	return (
		<>
			<Header />
			{props.children}
		</>
	);
};

export default MainLayout;
