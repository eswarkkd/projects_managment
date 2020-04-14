import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Link,Redirect} from 'react-router-dom';
const PrivateRoute = ({component:Component,...rest})=>{
	var validToken = localStorage.token;
	
	return (<Route {...rest} render={props=>{
		if(validToken){
			return <Component {...props} />
		}else{
			return <Redirect to="/" />
		}
	}}></Route>);
}
export default PrivateRoute;