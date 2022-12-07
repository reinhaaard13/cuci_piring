import React, { useState } from "react";

import { IoIosCreate } from "react-icons/io";
import { Box, ActionIcon, Text, Modal } from "@mantine/core";
import { closeAllModals, openConfirmModal } from "@mantine/modals";
import { useMediaQuery } from "@mantine/hooks";
import Camera from "../organism/Camera";

type Props = {};

const NewPostButton = (props: Props) => {
	const isMobile = useMediaQuery("(max-width: 768px)");
	const [imageUrl, setImageUrl] = useState<string | null>(null)

	const openModal = () => openConfirmModal({
		title: "Create new post",
		fullScreen: isMobile,
		centered: true,
		children: (
			<>
				<Camera setImageUrl={setImageUrl} imageUrl={imageUrl} />
			</>
		),
		closeOnConfirm: false,
		labels: {
			confirm: "Next",
			cancel: "Cancel",
		},
		onConfirm: () => openConfirmModal({
			title: "Add Post Details",
			fullScreen: isMobile,
			centered: true,
			children: (
				<>
					PostDetail Here
				</>
			),
			labels: {
				confirm: "Post",
				cancel: "Cancel",
			},
			onConfirm: () => {
				closeAllModals()
				setImageUrl(null)
			}
		})
	})

	return (
		<ActionIcon
			size={60}
			color={"cyan"}
			variant={"filled"}
			radius={"xl"}
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
