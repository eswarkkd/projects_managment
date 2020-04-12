 import React,{Component} from 'react';
import Button from '@material-ui/core/button';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import axios from 'axios';
import StickyHeadTable from './tables';
import Header from './header';

class Dashboard extends Component{
	constructor(props){
		super(props);
		this.state = {
			projectsCount:"",
			errorMessage:""
		}
		
	}
	componentDidMount(){
		axios({
			method:'post',
			url:'http://localhost:3434/projects/',
			headers:{'authentication':localStorage.getItem('token') },
			data:{}
		}).then((result)=>{
			if(result.status==200){
				if(result.data.status){
					this.setState({errorMessage:"",projectsCount:result.data.projects.length});
				}else{
					this.setState({errorMessage:result.data.message});
				}				
			}else{
			this.setState({errorMessage:"Error occured while fetching data."});			
			}

		}).catch((error)=>{ this.setState({errorMessage:"Error occured while fetching data."}); });
	}
	render(){
		const classes = makeStyles();
		return(
			<div className="container_class">
				
				<div className="row">
					<div className="col-sm-3">
						<Header />
					</div>
					<div className="col-sm-9 page_container">
						<div className="row">
							<div className="col-sm-12"><div className="heading_class">Add Project</div></div>
						</div>
						<div className="text-center">

						<div className="errors_class">{this.state.errorMessage}</div>
						<h1>Total projects {this.state.projectsCount}</h1></div>
					</div>
				</div>
				
				
			</div>
		);
	}
	
}
export default Dashboard;