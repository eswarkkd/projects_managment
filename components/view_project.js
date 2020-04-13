import React,{Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import axios from 'axios';
import Header from './header';
import videoIcon from '../images/video_icon.png';

class ViewProject extends Component{
	constructor(props){
		super(props);
		this.state = {
			imageFiles:[],
			videoFiles:[],
			errorMassage:"",
			message:"",
			formSubmit:0,
			title:"",
			description:"",
			images:[],
			videos:[],
		}
		const id = this.props.match.params.id;
	}
	removeImages(name){
		var deleteImages = this.state.images;
		deleteImages.push(name);
		var imagesNew = this.state.images;
		var index = imagesNew.indexOf(name);
		alert(imagesNew);
		imagesNew = imagesNew.splice(index,1);
		alert(imagesNew);
		this.setState({removedImages:deleteImages,images:imagesNew});
	}
	componentDidMount(){
		var token = localStorage.getItem('token');
		
		axios({
			method:'post',
			url:'http://localhost:3434/projects/get_project',
			headers:{'authentication':token},
			data:{id:this.props.match.params.id}
		}).then((result)=>{ 
			if(result.status==200){
				if(result.data.status){
					this.setState({message:"",errorMassage:"",title:result.data.projects.title,description:result.data.projects.description,images:result.data.projects.images,videos:result.data.projects.videos});					
				}else{
					this.setState({message:"",errorMassage:result.data.message});	
				}
			}else{
				alert(3);
				this.setState({message:"",errorMassage:result.data.message});
			}
			
		}).catch((error)=>{ 
			this.setState({errorMessage:error});
		});
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
							<div className="col-sm-12"><div className="heading_class">Veiw Project</div></div>
						</div>
						<div className="row">
						<div className="col-sm-12">
							<div className="errors_class">{this.state.errorMassage}</div>
							<div className="success_class">{this.state.message}</div>
						</div>							
						</div>
						<div className="row">
							<div className="col-sm-6">
							<div className="content_class">
								
									<div className="row">
										<div className="col-sm-12"><h3>{this.state.title}</h3></div>
									</div>
									<div className="row">
									<div className="col-sm-12"><div>{this.state.description}</div></div>
									</div>		
								
							</div>
														
							</div>
							<div className="col-sm-6">
							<div className="scroll_content">
									<div><h3>ploaded Files</h3></div>
									<div>Images</div>
									<hr />
									<div className="image_block">
									{this.state.images.map((file)=>{										
											return (
											<div className="float_class">
											<div>
												<div className="thumbnail"><img src={"http://localhost:3434/uploades/"+file} /></div>
												
											</div>
											</div>)
									})}
									</div><br />
									<div>Videos</div>
									<hr />
									<div className="image_block">
									{this.state.videos.map((file)=>{										
											return (
											<div className="float_class">
											<div>
												<div className="thumbnail" onClick={()=>{alert("Player not integreated.");}}><img src={videoIcon} /></div>
												
											</div>
											</div>)
									})}
									</div>
								</div>
							</div>					
						</div>
						
					</div>
				</div>
				
				
			</div>
		);
	}
	
}
export default ViewProject;