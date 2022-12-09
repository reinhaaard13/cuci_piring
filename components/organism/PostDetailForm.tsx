import React from "react";

import {
	Box,
	Flex,
	useMantineTheme,
	TextInput,
	Textarea,
	Button,
} from "@mantine/core";
import { Control, Controller, FieldErrorsImpl } from "react-hook-form";
import { NewPostPayload } from "../../types/payload";
import { IoSend } from "react-icons/io5";
import { closeModal } from "@mantine/modals";

type Props = {
	control: Control<NewPostPayload | any>;
	errors: Partial<FieldErrorsImpl<NewPostPayload>>;
	isDirty: boolean;
	isSubmitting: boolean;
	isValid: boolean;
  onCancel: () => void;
};

const PostDetailForm = (props: Props) => {
	const theme = useMantineTheme();

	return (
		<Box>
			<Controller
				control={props.control}
				name="postTitle"
				rules={{
					required: "Post subject is required",
				}}
				render={({ field: { onChange, value } }) => (
					<TextInput
						label="Post Subject"
						name="postTitle"
						onChange={onChange}
						value={value}
						radius={"md"}
						error={props.errors.postTitle?.message}
					/>
				)}
			/>

			<Controller
				name="postDescription"
				control={props.control}
				render={({ field: { onChange, value } }) => (
					<Textarea
						label="Post Description"
						radius={"md"}
						name={"postDescription"}
						value={value}
						onChange={onChange}
						error={props.errors.postDescription?.message}
						sx={{ marginBottom: theme.spacing.md }}
					/>
				)}
			/>

			<Flex justify={"end"}>
				<Button
					variant="subtle"
					color={"red"}
					radius={"md"}
					mr={4}
					onClick={props.onCancel}
					disabled={props.isSubmitting}
				>
					Cancel
				</Button>
				<Button
					type="submit"
					radius={"md"}
					rightIcon={<IoSend />}
					loading={props.isSubmitting}
					disabled={!props.isValid || !props.isDirty}
				>
					Post
				</Button>
			</Flex>
		</Box>
	);
};

export default PostDetailForm;
