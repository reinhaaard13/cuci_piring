import { Text, Box, UnstyledButton } from "@mantine/core";
import Image from "next/image";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { TbCameraRotate } from "react-icons/tb";
import { FacingMode, SetImageUrl, Stream } from "../../types/camera";

type Props = {
	setImageUrl: SetImageUrl;
	imageUrl: string | null;
};

interface MediaSourceExtended extends MediaSource {
	getTracks: () => MediaStreamTrack[];
	getVideoTracks: () => MediaStreamTrack[];
}

interface HTMLVideoElementExtended extends HTMLVideoElement {
	srcObject: MediaStream | MediaSourceExtended | null;
}

const Camera = (props: Props) => {
	const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
	const [numberOfCameras, setNumberOfCameras] = useState(0);
	const [stream, setStream] = useState<Stream>(null);
	const [facingMode, setFacingMode] = useState<FacingMode>("user");

	const playerRef = useRef<HTMLVideoElementExtended>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const initializeMedia = async () => {
		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
		}

		if (
			"mediaDevices" in navigator &&
			"getUserMedia" in navigator.mediaDevices
		) {
			navigator.mediaDevices
				.getUserMedia({
					audio: false,
					video: {
						facingMode: facingMode,
					},
				})
				.then((stream) => {
					setStream(stream);
					navigator.mediaDevices.enumerateDevices().then((r) => {
						setNumberOfCameras(
							r.filter((device) => device.kind === "videoinput").length
						);
					});
				});
		} else {
			alert("Camera not supported");
		}
	};

	useEffect(() => {
		if (stream && playerRef && playerRef.current) {
			playerRef.current.srcObject = stream;
		}

		return () => {
			if (stream) {
				stream.getTracks().forEach((track) => track.stop());
			}
		};
	}, [stream]);

	useEffect(() => {
		if (props.imageUrl) {
			setImageDataUrl(props.imageUrl)
			return
		};

		initializeMedia();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [facingMode]);

	const captureImage = () => {
		if (numberOfCameras < 1) {
			alert("No camera detected");
			return;
		}

		if (canvasRef.current && playerRef?.current) {
			const playerWidth = playerRef.current?.videoWidth || 1080;
			const playerHeight = playerRef.current?.videoHeight || 1080;
			const playerAspectRatio = playerWidth / playerHeight;

			canvasRef.current.width = playerWidth;
			canvasRef.current.height = playerHeight;

			const context = canvasRef.current.getContext("2d");
			context?.drawImage(
				playerRef.current,
				0,
				0,
				canvasRef.current.width,
				canvasRef.current.height
			);

			if (stream) {
				stream.getTracks().forEach((track) => track.stop());
			}

			props.setImageUrl(canvasRef.current.toDataURL("image/png"));
			setImageDataUrl(canvasRef.current.toDataURL("image/png"));
		}
	};

	const switchCamera = async () => {
		if (facingMode === "user") {
			setFacingMode("environment");
		} else {
			setFacingMode("user");
		}
	};

	return (
		<Box
			sx={(theme) => ({
				width: "100%",
				aspectRatio: "1/1",
				borderRadius: theme.radius.md,
				overflow: "hidden",
				position: "relative",
			})}
		>
			{imageDataUrl ? (
				<Image
					src={imageDataUrl}
					alt="photo"
					fill={true}
					style={{ objectFit: "cover" }}
				/>
			) : (
				<video
					ref={playerRef}
					style={{ objectFit: "cover", width: "100%", height: "100%" }}
					autoPlay
					muted
				></video>
			)}
			{!imageDataUrl && (
				<Box
					sx={(theme) => ({
						position: "absolute",
						bottom: theme.spacing.lg,
						right: theme.spacing.lg,
						display: "flex",
						flexDirection: "row-reverse",
						gap: 15,
						justifyContent: "center",
						alignItems: "end",
					})}
				>
					<UnstyledButton
						sx={(theme) => ({
							height: 40,
							width: 40,
							backgroundColor: theme.white,
							borderRadius: theme.radius.xl,
							outlineWidth: 2,
							outlineColor: theme.white,
							outlineStyle: "solid",
							outlineOffset: 4,
							transition: "all 0.2s ease-in-out",

							"&:hover": {
								outlineColor: "rgba(255, 255, 255, 0.5)",
							},
						})}
						onClick={captureImage}
					></UnstyledButton>
					<UnstyledButton
						sx={(theme) => ({
							height: 30,
							width: 30,
							backgroundColor: theme.white,
							color: theme.black,
							borderRadius: theme.radius.xl,
							transition: "all 0.2s ease-in-out",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",

							"&:hover": {
								outlineColor: "rgba(255, 255, 255, 0.5)",
							},
						})}
						onClick={switchCamera}
					>
						<TbCameraRotate />
					</UnstyledButton>
					<canvas ref={canvasRef} style={{ display: "none" }} />
				</Box>
			)}
		</Box>
	);
};

export default Camera;
