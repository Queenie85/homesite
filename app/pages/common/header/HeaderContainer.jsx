import React, { Component } from 'react'
import PropTypes from 'prop-types'
import HeaderLogo from './HeaderLogo'
import HeaderNavBar from './HeaderNavBar'
import { Navbar } from 'reactstrap'

Navbar.propTypes = {
    light: PropTypes.bool,
    dark: PropTypes.bool,
    fixed: PropTypes.string,
    color: PropTypes.string,
    role: PropTypes.string,
    expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
}

export default class HeaderContainer extends Component {

	render() {
		return (
			<div>
                <Navbar className="top-nav position-fixed row navbar-expand-sm" fixed="top">
					<div className="container-fixer">
						<div className="logo-header flexer-1 col-sm-3 col-sm-offset-1 col-xs-4">
							<HeaderLogo/>
						</div>
						<div className="col-sm-offset-2 collapse navbar-collapse flexer-2 navbar-header">
							<HeaderNavBar/>
						</div>
					</div>
				</Navbar>
			</div>
		)
	}
}