import React from 'react'
import { AddImage } from './AddImage'
import { Gallery } from './Gallery'

export const Home = () => {

	return (
		<div className='container'>
			<AddImage />
			<Gallery />
		</div>
	)
}
