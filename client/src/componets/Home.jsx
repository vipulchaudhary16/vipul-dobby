import React, { useContext } from 'react'
import { AuthContext } from '../contexts/auth.context'

export const Home = () => {
	const { user } = useContext(AuthContext)
	return (
		<>
			<p className='heading'>
				Hi, {user?.name}
			</p>
		</>
	)
}
