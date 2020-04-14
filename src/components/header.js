import React,{Component} from 'react'; 
import {Link,Redirect} from 'react-router-dom';
class Header extends Component{
	constructor(props){
		super(props);
		this.state = {
			menu:"",
			username:""
		}
	}
	
	componentDidMount(){
		var username=localStorage.getItem("username");
		this.setState({username:username});
	}
	logout(e){
		localStorage.removeItem('token');
		localStorage.removeItem('username');
		this.setState({token:""});
	}	
	render(){
		if(this.state.token === ""){ 
			return <Redirect to="/" /> 
		};
		return <div className="header_div"><div className="header">
			<div className="top_heading">
				<h1>Projects Management</h1>
				<div className="text-right">{"Hi "+this.state.username} </div>
				<div className="mobile_menu">
					<ul>
					<li><Link to="/dashboard">Dashboard</Link></li>
					<li><Link to="/add_project">Add Project</Link></li>
					<li><Link to="/projects">Projects</Link></li>
					<li><a href="javascript:void(0)" onClick={this.logout.bind(this)}>Logout</a></li>
					</ul>
				</div>
			</div>
			<div className="menu">
				<ul>
					<li><Link to="/dashboard">Dashboard</Link></li>
					<li><Link to="/add_project">Add Project</Link></li>
					<li><Link to="/projects">Projects</Link></li>
					<li><a href="javascript:void(0)" onClick={this.logout.bind(this)}>Logout</a></li>
				</ul>
			</div>
		</div></div>
	}
}
export default Header;