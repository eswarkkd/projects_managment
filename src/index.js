import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';
import AddProject from './components/add_project';
import Projects from './components/projects';
import Editproject from './components/edit_project';
import ViewProject from './components/view_project';
import PrivateRoute from './auth/auth';
import './styles.css';
ReactDOM.render(
  <React.StrictMode>
    
	<Router>
		<div>
			<Route exact path="/" component={Login}></Route>
			<PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>
			<PrivateRoute path="/projects" component={Projects}></PrivateRoute>
			<PrivateRoute path="/add_project" component={AddProject}></PrivateRoute>
			<PrivateRoute path="/edit_project/:id" component={Editproject}></PrivateRoute>
			<PrivateRoute path="/view_project/:id" component={ViewProject}></PrivateRoute>
		</div>
	</Router>
	
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();