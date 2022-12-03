import React, { useState, useRef, useEffect } from 'react'

type Props = {}

const Camera = (props: Props) => {
  const [imageDataUrl, setImageDataUrl] = useState(null)
  const [cameraNumber, setCameraNumber] = useState(0)

  const playerRef = useRef<HTMLVideoElement>(null)

  const initializeMedia = async () => {
    setImageDataUrl(null)

    const videoDevices = await getListOfVideoDevices()

    console.log(videoDevices)

    if (videoDevices.length) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: videoDevices[cameraNumber].deviceId,
          }
        })
        playerRef.current!.srcObject = stream
        playerRef.current?.play()
      } catch (err) {
        console.log("error here")
        console.error(err)
      }
    } else {
      alert('No video devices found')
    }
  }

  const getListOfVideoDevices = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    const devices = await navigator.mediaDevices.enumerateDevices()

    return devices.filter(device => device.kind === 'videoinput')
  }

  useEffect(() => {
    initializeMedia()

    return () => {
      
    }
  }, [])

  return (
    <video ref={playerRef} autoPlay></video>
  )
}

export default Camera