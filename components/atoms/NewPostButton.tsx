import React from "react";

import { IoIosCreate } from "react-icons/io";
import { Box, ActionIcon, Text, Modal } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useMediaQuery } from "@mantine/hooks";
import Camera from "../organism/Camera";

type Props = {};

const NewPostButton = (props: Props) => {
	const isMobile = useMediaQuery("(max-width: 768px)");

	const openModal = () => openConfirmModal({
		title: "Create new post",
		fullScreen: isMobile,
		centered: true,
		children: (
			<>
			<Camera />
			</>
		),
		labels: {
			confirm: "Next",
			cancel: "Cancel",
		}
	})

	return (
		<ActionIcon
			size={60}
			color={"cyan"}
			variant={"filled"}
			radius={"lg"}
			sx={(theme) => ({
				position: "fixed",
				bottom: theme.spacing.lg,
				right: theme.spacing.lg,
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
        boxShadow: theme.shadows.sm
			})}
			onClick={openModal}
		>
			<IoIosCreate />
			<Text sx={(theme) => ({ fontSize: theme.fontSizes.xs, fontWeight: 600 })}>
				CUCI
			</Text>
		</ActionIcon>
	);
};

export default NewPostButton;
