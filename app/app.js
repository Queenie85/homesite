require('./stylesheets/app.scss')
import 'bootstrap/dist/css/bootstrap.css'
//react stuff
import React from 'react'
import {render} from 'react-dom'
import {Route, BrowserRouter, HashRouter, Switch} from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
//redux stuff
import {Provider} from 'react-redux'
import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import homesite from './reducers'
import HomePageContainer from './pages/home/HomePageContainer'
import SignupContainer from './pages/users/signup/SignupContainer'
import HeaderContainer from './pages/common/header/HeaderContainer'
import config from './config/config'
//util

const env = config.env

let Router
if (env === 'dev') {
	Router = HashRouter
} else {
	Router = BrowserRouter
}

let store = createStore(homesite,
	compose(
		applyMiddleware(thunk)
	)
)

let routes = (
	<div className="app">
		<Provider store={store}>
			<Router>
				<ReactCSSTransitionGroup
					transitionName="overall"
					transitionEnterTimeout={1000}
					transitionLeaveTimeout={1000}>
					<HeaderContainer/>
					<div className="main-content">
						<Switch>
							<Route exact name="signup" path="/users/signup" component={SignupContainer}/>
							<Route exact name="home" path="/" component={HomePageContainer}/>
						</Switch>
					</div>
				</ReactCSSTransitionGroup>
			</Router>
		</Provider>
	</div>
)

render(routes, document.getElementById('root'))

