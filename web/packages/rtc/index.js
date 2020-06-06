import { WebRTCManager } from './webRTCManager';

export async function connect(name, callee, localRef, remoteRef) {
	const stream = await getLocalStream(localRef);
	const manager = new WebRTCManager(name, callee, stream, remoteRef);
	await manager.createWebSocket()
	manager.createRTCPeerConnection();
	manager.start();
}

async function getLocalStream(localRef) {
	return navigator.mediaDevices.getUserMedia({ video: true })
		.then(stream => {
			localRef.current.srcObject = stream;
			return stream;
		})
}
