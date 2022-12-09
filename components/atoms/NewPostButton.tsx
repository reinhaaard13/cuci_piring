import React, { useState, useEffect } from "react";

import { IoIosCreate } from "react-icons/io";
import { Box, ActionIcon, Text, Modal } from "@mantine/core";
import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import { useMediaQuery } from "@mantine/hooks";
import Camera from "../organism/Camera";
import PostDetailForm from "../organism/PostDetailForm";
import { useForm } from "react-hook-form";
import { NewPostPayload } from "../../types/payload";
import useUser from "../../hooks/useUser";
import { useRouter } from "next/router";
import PostApi from "../../services/PostApi";
import { useMutation, useQueryClient } from "react-query";
import { showNotification } from "@mantine/notifications";

type Props = {};

const NewPostButton = (props: Props) => {
	const isMobile = useMediaQuery("(max-width: 768px)");
	const { user } = useUser();
	const [newPostModalOpened, setNewPostModalOpened] = useState(false);
	const {
		query: { familyCode },
	} = useRouter();
	const queryClient = useQueryClient()

	const {
		setValue,
		formState: { errors, isDirty, isSubmitting, isValid },
		control,
		watch,
		reset,
		handleSubmit,
		register,
		trigger,
		unregister
	} = useForm<NewPostPayload>({
		defaultValues: {
			postTitle: "",
			postDescription: "",
			image: null,
			familyId: familyCode as string,
			userId: user?._id,
		},
		mode: "onChange",
	});
	
	const createNewPostMutation = useMutation(PostApi.createNewPost, {
		onSuccess: (data) => {
			showNotification({
				title: "Success",
				message: "Post created successfully",
				color: "teal",
			})
			handleCloseModal()
			queryClient.invalidateQueries("Family")
		},
		onError: (error) => {
			console.log(error)
			showNotification({
				title: "Error",
				message: "Something went wrong",
				color: "red",
			})
		}
	})
	
	useEffect(() => {
		register("image", { required: "Image is required" });

		return () => {
			unregister("image");
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleOnPostSubmit = async (values: NewPostPayload) => {
		await createNewPostMutation.mutateAsync(values)
	};

	const handleCloseModal = () => {
		setNewPostModalOpened(false);
		reset()
	};

	const handleSetImageUrl = (url: string) => {
		setValue("image", url)
		trigger()
	}

	return (
		<>
			<Modal
				opened={newPostModalOpened}
				onClose={handleCloseModal}
				title="Create new post"
				fullScreen={isMobile}
				centered
			>
				<form onSubmit={handleSubmit(handleOnPostSubmit)}>
					<Camera setImageUrl={handleSetImageUrl} imageUrl={watch("image")} />
					<PostDetailForm
						control={control}
						errors={errors}
						isDirty={isDirty}
						isSubmitting={isSubmitting}
						isValid={isValid}
						onCancel={handleCloseModal}
					/>
				</form>
			</Modal>

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
					boxShadow: theme.shadows.sm,
				})}
				onClick={() => setNewPostModalOpened(true)}
			>
				<IoIosCreate />
				<Text
					sx={(theme) => ({ fontSize: theme.fontSizes.xs, fontWeight: 600 })}
				>
					CUCI
				</Text>
			</ActionIcon>
		</>
	);
};

export default NewPostButton;
