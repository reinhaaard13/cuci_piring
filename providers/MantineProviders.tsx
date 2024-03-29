import React from "react";

import { MantineProvider } from "@mantine/core";
import useColorScheme from "../hooks/useColorScheme";

type Props = {
  children: React.ReactNode;
};

const MantineProviders: React.FC<Props> = ({ children }) => {
  const { colorScheme } = useColorScheme()
  
	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				/** Put your mantine theme override here */
				colorScheme: colorScheme,

				fontFamily: "Plus Jakarta Sans, sans-serif",

				black: "#333",
				white: "#f8f8f8",

				shadows: {
					xs: "0 1px 3px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.1)",
					sm: "0 1px 3px rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.03) 0px 10px 15px -5px, rgba(0, 0, 0, 0.03) 0px 7px 7px -5px",
					md: "0 1px 3px rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.03) 0px 20px 25px -5px, rgba(0, 0, 0, 0.03) 0px 10px 10px -5px",
					lg: "0 1px 3px rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.03) 0px 28px 23px -7px, rgba(0, 0, 0, 0.03) 0px 12px 12px -7px",
					xl: "0 1px 3px rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.03) 0px 36px 28px -7px, rgba(0, 0, 0, 0.03) 0px 17px 17px -7px",
				},

				transitionTimingFunction: "cubic-bezier(0.645, 0.045, 0.355, 1)",
			}}
		>
      {children}
    </MantineProvider>
	);
};

export default MantineProviders;
