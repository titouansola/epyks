export class WebRTCManager {
	// peerConnection;
	// webSocket;
	// localStream;
	// remoteVideoRef;

	constructor(name, callee, localStream, remoteVideoRef) {
		this.name = name;
		this.callee = callee;
		this.localStream = localStream;
		this.remoteVideoRef = remoteVideoRef;
	}

	start() {
		this.sendMessage({
			channel: 'start_call',
			to: this.callee
		})
	}

	// WEBSOCKET METHODS
	async createWebSocket() {
		return new Promise(resolve => {
			this.webSocket = new WebSocket(`ws://${location.host}/ws`);
	
			this.webSocket.onopen = () => {
				console.log('connection openned')
				this.sendMessage({ channel: 'login', name: this.name });
				resolve();
			}
	
			this.webSocket.onmessage = event => this.handleMessage(JSON.parse(event.data.toString()))
		})
	}

	sendMessage(message) {
		console.log('sending message', message.channel)
		this.webSocket.send(JSON.stringify(message))
	}

	async handleMessage(message) {
		console.log('message received', message.channel)
		switch(message.channel) {
			case 'start_call': {
				const offer = await this.peerConnection.createOffer();
				await this.peerConnection.setLocalDescription(offer);
				this.sendMessage({
					channel: 'webrtc_offer',
					offer,
					to: this.callee
				});
			}

			case 'webrtc_offer': {
				await this.peerConnection.setRemoteDescription(message.offer);

				const answer = await this.peerConnection.createAnswer();
				await this.peerConnection.setLocalDescription(answer);
				this.sendMessage({
					channel: 'webrtc_answer',
					answer,
					to: this.callee
				});
			}

			case 'webrtc_answer': {
				await this.peerConnection.setRemoteDescription(message.answer);
			}

			case 'webrtc_ice_candidate': {
				await this.peerConnection.addIceCandidate(message.candidate);
			}
		}
	}

	// RTC PEER CONNECTION METHODS
	createRTCPeerConnection() {
		this.peerConnection = new RTCPeerConnection({
			iceServers: [
				{ urls: ['stun:stun.stunprotocol.org'] }
			]
		});

		this.localStream.getTracks().forEach(track => {
			this.peerConnection.addTrack(track, this.localStream)
		})
	
		this.peerConnection.onicecandidate = event => {
			if(!event.candidate) return;
	
			this.sendMessage({
				channel: 'webrtc_ice_candidate',
				candidate: event.candidate,
				to: this.callee
			})
		}

		this.peerConnection.ontrack = event => {
			this.remoteVideoRef.current.srcObject = event.streams[0];
		}
	}
}