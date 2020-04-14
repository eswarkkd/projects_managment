 import React,{Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import axios from 'axios';
import StickyHeadTable from './tables';
import Header from './header';
import endpoints from './endpoints';

class Projects extends Component{
	constructor(props){
		super(props);
		this.state = {
			projects:[],
			errorMessage:""
		}
		
	}
	componentDidMount(){
		axios({
			method:'post',
			url:endpoints.basepath+endpoints.projects,
			headers:{'authentication':localStorage.getItem('token') },
			data:{}
		}).then((result)=>{
			if(result.status==200){
				if(result.data.status){
				var projectsData = result.data.projects;
					projectsData=projectsData.reverse();
					this.setState({errorMessage:"",projects:result.data.projects});
				}else{
					this.setState({errorMessage:result.data.message});
				}				
			}
		}).catch((error)=>{ this.setState({errorMessage:"Error occured"}); });
		
	}
	
	render(){
		{console.log(this.state.projects)}
		const classes = makeStyles();
		return(
			<div className="container_class">
				
				<div className="row">
					<div className="col-sm-3">
						<Header />
					</div>
					<div className="col-sm-9 page_container">

						
						<div className="heading_class">Dashboard</div>
						<StickyHeadTable data={this.state.projects} />
					</div>
				</div>
				
				
			</div>
		);
	}
	
}
export default Projects;