import { Text, Box, UnstyledButton } from "@mantine/core";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { TbCameraRotate } from "react-icons/tb";
import { FacingMode, Stream } from "../../types/camera";

type Props = {};

interface MediaSourceExtended extends MediaSource {
	getTracks: () => MediaStreamTrack[];
	getVideoTracks: () => MediaStreamTrack[];
}

interface HTMLVideoElementExtended extends HTMLVideoElement {
	srcObject: MediaStream | MediaSourceExtended | null;
}

const Camera = (props: Props) => {
	const [imageDataUrl, setImageDataUrl] = useState(null);
	const [cameraNumber, setCameraNumber] = useState(0);
	const [stream, setStream] = useState<Stream>(null);
	const [facingMode, setFacingMode] = useState<FacingMode>("user");

	const playerRef = useRef<HTMLVideoElementExtended | null>(null);
	const streamRef = useRef<HTMLVideoElementExtended | null>(null);

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
				});
		} else {
			alert("Camera not supported");
		}

		// const videoDevices = await getListOfVideoDevices();

		// if (videoDevices.length) {
		// 	try {
		// 		const stream = await navigator.mediaDevices.getUserMedia({
		// 			video: {
		// 				deviceId: {
		// 					exact: videoDevices[cameraNumber].deviceId,
		// 				},
		// 			},
		// 		});

		// 		playerRef.current!.srcObject = stream;
		// 		await playerRef.current?.play();

		// 		return playerRef.current;
		// 	} catch (err) {
		// 		console.log("error here");
		// 		console.error(err);
		// 	}
		// } else {
		// 	alert("No video devices found");
		// }
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
		initializeMedia()
	}, [facingMode])

	const getListOfVideoDevices = async () => {
		await navigator.mediaDevices.getUserMedia({ video: true });
		const devices = await navigator.mediaDevices.enumerateDevices();

		return devices.filter((device) => device.kind === "videoinput");
	};

	const switchCamera = async () => {
		// const videoInputsList = await getListOfVideoDevices();

		// if (videoInputsList.length > 1) {
		// 	// will re-initialize in useEffect hook below
		// 	setCameraNumber((prev) => (prev === 0 ? 1 : 0));
		// } else if (videoInputsList.length === 1) {
		// 	alert("Only one camera found");
		// } else {
		// 	alert("No camera found");
		// }

		if (facingMode === "user") {
			setFacingMode("environment")
		} else {
			setFacingMode("user")
		}
	};

	// useEffect(() => {
	// 	initializeMedia().then((stream) => {
	// 		if (stream) streamRef.current = stream;
	// 	});

	// 	return () => {
	// 		if (streamRef.current && streamRef.current.srcObject) {
	// 			const tracks = streamRef.current.srcObject.getTracks();
	// 			tracks.forEach((track: MediaStreamTrack) => {
	// 				track.stop();
	// 				console.log("deactivating track: ", track.label);
	// 			});
	// 		}

	// 		console.log("cleanup1");
	// 	};
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [cameraNumber]);

	const printCameraName = () => {
		console.log(playerRef.current?.srcObject?.getTracks()[0].label);
		// alert(playerRef.current?.srcObject?.getTracks()[0].label)
	};

	console.log("Rerender", facingMode);

	return (
		<Box
			sx={(theme) => ({
				width: "100%",
				aspectRatio: "4/3",
				borderRadius: theme.radius.md,
				overflow: "hidden",
				position: "relative",
			})}
		>
			<video
				ref={playerRef}
				style={{ objectFit: "cover", width: "100%", height: "100%" }}
				autoPlay
				muted
			></video>
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
					onClick={printCameraName}
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
			</Box>
		</Box>
	);
};

export default Camera;
