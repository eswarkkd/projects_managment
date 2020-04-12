import React,{Component} from 'react';
import Button from '@material-ui/core/button';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
		"errorMessage":"",
		isLogin:0
		}
		
	}
	userLogin(e){
		e.preventDefault();
		let username = e.target.username.value;
		let password = e.target.password.value;
		
		axios({
			method:'post',
			url:'http://localhost:3434/users/user_login',
			headers:{},
			data:{username:username,password:password}
		}).then((result)=>{
			if(result.status==200){
				if(result.data.status){
					localStorage.setItem('token',result.data.token);				
					localStorage.setItem('username',result.data.username);				
					this.setState({errorMessage:"",isLogin:1});
				}else{
					this.setState({errorMessage:result.data.message});
				}				
			}else{
				this.setState({errorMessage:"Error occured while fetching data"});
			}
		}).catch((error)=>{ this.setState({errorMessage:"Error occured while fetching data"}); });
	}
	
	render(){
		if(this.state.isLogin==1){ 
			return <Redirect to="/dashboard" /> 
		};
		const classes = makeStyles();
		return(
		
			<div>
				<div className="login_container">
				
				
				
				<form onSubmit={this.userLogin.bind(this)}>
					<div className="login_box">
						<div className="login_heading">Login</div>
						<div className="errors_class">{this.state.errorMessage}</div>
						<div className="row">
							<div className="col-sm-4"><div className="logo_class"><h2>LOGO</h2></div></div>
							<div className="col-sm-8">
							<div className="row">
								<div className="col-sm-12"><TextField required id="username" label="Username" defaultValue="admin" /></div>
								
								<div className="col-sm-12"><TextField type="password" required id="password" label="Password" defaultValue="admin" /></div>
							</div>
							</div>
						</div>
						<div className="login_button">
						<Button type="submit" size="small" variant="contained" color="primary" className={classes.button} endIcon={<ArrowForwardIosIcon />}>Login</Button></div>
						<div className="notice_class">Note: username <b>admin</b> and password : <b>admin</b></div>
					</div>
					</form>
				</div>
			</div>
		);
	}
	
}
export default Login;