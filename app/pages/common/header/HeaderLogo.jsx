import React, { Component } from 'react'
import logoImg from '../../../assets/logo/logo_175x50.png'

export default class HeaderLogo extends Component {

	render() {
		return (
			<div className="header">
				<a href='/'>
					<img className="logo-sm" alt="logo" src={logoImg}/>
				</a>
			</div>
		)
	}
}