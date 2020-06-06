import React from 'react'

export function Login (props) {
	return <form onSubmit={() => props.setLogged(true)}>
		<label>Pseudo :</label>
		<input value={props.pseudo} onChange={(e) => props.setPseudo(e.target.value)}/>
		<label>Callee :</label>
		<input value={props.callee} onChange={(e) => props.setCallee(e.target.value)}/>
		<button type="submit">GO</button>
	</form>
}