const users = [];

function findUserBySocket(socket) {
	return users.find(user => user.socket === socket);
}
function findUserByName(name) {
	return users.find(user => user.name === name);
}

function forwardMessage(sender, message) {
	const receiver = findUserByName(message.to);
	if (!receiver) return;

	receiver.socket.send(JSON.stringify({
		...message,
		from: sender.name
	}));
}

function handleSocketConnection(socket) {
	socket.onmessage = event => {
		handleMessage(
			socket,
			JSON.parse(event.data.toString())
		)
	}

	socket.onclose = () => {
		users.splice(
			users.findIndex(user => user.socket === socket),
			1
		);
	}
}

function handleMessage(socket, message) {
	if (message.channel === 'login') {
		users.push({ socket, name: message.name });
	} else {
		forwardMessage(findUserBySocket(socket), message);
	}
}

module.exports = { handleSocketConnection }