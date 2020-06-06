import React, { useState } from 'react';

import { Login } from './pages/Login';
import { Core } from './pages/Core';

export function App() {
	const [pseudo, setPseudo] = useState('')
	const [callee, setCallee] = useState('')
	const [logged, setLogged] = useState(false)

	return logged
	? <Core pseudo={pseudo} callee={callee} />
	: <Login
		pseudo={pseudo}
		setPseudo={setPseudo}
		callee={callee}
		setCallee={setCallee}
		setLogged={setLogged}
	/>
}