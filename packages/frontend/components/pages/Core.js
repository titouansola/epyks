import React, { useEffect, useRef } from 'react'
import { connect } from '@epyks/rtc';

const WIDTH = 400
const HEIGHT = 300

export function Core(props) {
	const localVideo = useRef();
	const remoteVideo = useRef();

	useEffect(() => {
		connect(props.pseudo, props.callee, localVideo, remoteVideo);
	}, null);

	return <>
		<div>
			Hello {props.pseudo}!
		</div>
		<video style={{ transform: 'rotateY(.5turn)' }} ref={localVideo} width={WIDTH} height={HEIGHT} autoPlay></video>
		<video ref={remoteVideo} width={WIDTH} height={HEIGHT} autoPlay></video>
	</>
}