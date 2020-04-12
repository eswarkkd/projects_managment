import React,{Component} from 'react';
import Button from '@material-ui/core/button';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import axios from 'axios';
import Header from './header';
import videoIcon from '../images/video_icon.png';

class Editproject extends Component{
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
			removedImages:[],
			removedVideos:[],
			imagesData:[],
			selectedTab:1,
			gallery:[]
		}
		
		const id = this.props.match.params.id;
	}
	
	removeImages(name){
		var deleteImages = this.state.removedImages;
		deleteImages.push(name);
		var imagesNew = this.state.images;
		imagesNew = imagesNew.filter((element)=>{ if(element!=name){ return element; }});
		this.setState({removedImages:deleteImages,images:imagesNew});
		
	}
	removeVideos(name){
		var deleteVideos = this.state.removedVideos;
		deleteVideos.push(name);
		var videosNew = this.state.videos;
		videosNew = videosNew.filter((element)=>{ if(element != name){ return element;}});
		this.setState({removedVideos:deleteVideos,videos:videosNew});
	}
	tabAction(id){
		this.setState({selectedTab:id});
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
				
				this.setState({message:"",errorMassage:result.data.message});
			}
			
		}).catch((error)=>{ 
			this.setState({errorMessage:error});
		});
		// gallery
		axios({
			method:'post',
			url:'http://localhost:3434/projects/gallery',
			headers:{'authentication':token}
		}).then((result)=>{ 
			if(result.status==200){
				if(result.data.status){
					this.setState({imagesData:result.data.data});	
				}else{
					this.setState({imagesData:[]});	
				}
			}else{
				this.setState({imagesData:[]});
			}
			
		}).catch((error)=>{ 
			this.setState({imageData:[]});
		});
	}
	addMedia(e,filename){
		var galleryImages = this.state.gallery;
		galleryImages.push(filename);
		this.setState({gallery:galleryImages});
	}
	handleChange(e,field){
		this.setState({[field]:e.target.value});
	}
	fileHandler(e){
		var filesList=[];
		
		console.log(e.target.files.length);
		if(e.target.files.length){
			for(let i=0; i<e.target.files.length; i++){
				console.log(e.target.files[i]);
			filesList.push(e.target.files[i]);
			}			
		}
		this.setState({imageFiles:filesList});
		console.log(this.state.imageFiles);
	}
	vidoeFilesHandler(e){
		var filesList=[];
		
		if(e.target.files.length){
			for(let i=0; i<e.target.files.length; i++){
				console.log(e.target.files[i]);
			filesList.push(e.target.files[i]);
			}			
		}
		this.setState({videoFiles:filesList});
	}
	
	
	saveProject(e){
		e.preventDefault();
		var gallery = this.state.gallery;
		
		const id = this.props.match.params.id;
		
		e.preventDefault();
		var removedImages = this.state.removedImages;
		var removedVideos = this.state.removedVideos;
		removedImages = removedImages.join('|');
		removedVideos = removedVideos.join('|');
		var formData = new FormData();
		formData.append('title',e.target.title.value);
		formData.append('description',e.target.description.value);
		formData.append('removedimages',removedImages);
		formData.append('removedvideos',removedVideos);
		formData.append('id',id);
		var imagesArray = this.state.imageFiles;
		
		gallery=gallery.join('|');
		formData.append('gallery',gallery);
		imagesArray = imagesArray.concat(this.state.videoFiles);
		if(imagesArray.length){
			for(let i=0; i<imagesArray.length;i++){
			formData.append('uploadfiles',imagesArray[i]);	
			}	
		}else{
			formData.append('uploadfiles',"");	
		}
		var token = localStorage.getItem('token');
		this.setState({formSubmit:1});
		axios({
			method:'post',
			url:'http://localhost:3434/projects/update_project',
			headers:{'Content-type':'multipart/form-data','authentication':token},
			data:formData
		}).then((result)=>{ 
			if(result.status==200){
				if(result.data.status){
					alert("updated");
					this.setState({message:result.data.message,errorMassage:""});
					e.targer.reset();	
				}else{
					alert("not updated");
					this.setState({message:"",errorMassage:result.data.message});	
				}
			}else{
				this.setState({message:result.data.message,errorMassage:result.data.message});
			}
			
		}).catch((error)=>{ 
			this.setState({errorMessage:error});
		});
		this.setState({formSubmit:0});
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

					<form onSubmit={this.saveProject.bind(this)}>
					
						<div className="row">
							<div className="col-sm-12"><div className="heading_class">Edit project</div></div>
						</div>
						<div className="row">
						<div className="col-sm-12">
							<div className="errors_class">{this.state.errorMassage}</div>
							<div className="success_class">{this.state.message}</div>
						</div>							
						</div>
						<div className="row">
							<div className="col-sm-6">
								<div className="row">
									<div className="col-sm-12"><TextField required id="title" label="title" value={this.state.title} onChange={(e)=>{this.handleChange(e,'title')}} /></div>									
									<div className="col-sm-12"><TextField multiline rows={10} required id="description" label="description" value={this.state.description} onChange={(e)=>{this.handleChange(e,'description')}} /></div>
								</div>
								
								
							</div>
							<div className="col-sm-6">
							
							
															<div className="row">
									<div className="cols-sm-6"><Button onClick={()=>{this.tabAction(1)}} variant={(this.state.selectedTab==1)? "contained":""} color="primary" className={classes.button}>Upload from Drive</Button> </div>
									<div className="cols-sm-6"> <Button onClick={()=>{this.tabAction(2)}} variant={(this.state.selectedTab==2)? "contained":""} color="primary" className={classes.button}>Upload from Gallery</Button></div>
								</div>
								
									<div id="tab1" style={(this.state.selectedTab==1)?{display:'block'}:{display:'none'}}><br />
										<b>Upload image files, to pick multiple files hold control key.<br />
										(supported formats for videos .jpg, .gif, .png)<br /><br /></b>
										<input type="file" id="imagefiles" multiple onChange={this.fileHandler.bind(this)} />
										<br /><br /><br />
										<hr />
										<b>Upload video files, to pick multiple files hold control key.<br />
										(supported formats for videos .mp3, .mpeg)<br /><br /></b>
										<input type="file" id="vidoefiles" multiple onChange={this.vidoeFilesHandler.bind(this)} />
									</div>								
									<div id="tab2" style={(this.state.selectedTab==2)? {display:'block'}:{display:'none'}}>
									<div className="scroll_view">
										<div className="image_block">
										{ this.state.imagesData.map((file)=>{		
										
												return (
												<div className="float_class">
												<div>
													<div className="thumbnail" onClick={()=>{alert("Player not integreated.");}}>
														<img src={(file.type=="image")?"http://localhost:3434/uploades/"+file.image:videoIcon} />
													</div>								
													<div className="text-center">
														<Button color="primary" variant="contained" className={classes.button} size="small" key={file.image} onClick={()=>{this.addMedia(this,file.image)}}>Add</Button>
													</div>
												</div>												
												</div>)
										})}
										</div>
										
									</div>
									<div><TextField multiline rows={5} required id="gallery" variant="filled" inputProps ={{readOnly:true}}label="selected images" value={(this.state.gallery).join('\n')} />
									<Button color="primary" onClick={()=>{this.setState({gallery:[]})}} className={classes.button} endIcon={<ArrowForwardIosIcon />}>Clear</Button>
									</div>
									</div>

							
							
							
							</div>					
						</div>
						<div className="row">
							<div className="col-sm-12">
							<div className="scroll_view">
							<hr />
									<div><h3>Uploaded images</h3></div>
									<div className="image_block">
									{ this.state.images.map((file)=>{										
											return (
											<div className="float_class">
											<div>
												<div className="thumbnail"><img src={"http://localhost:3434/uploades/"+file} /></div>
												<div className="text-center">
													<Button size="small" onClick={this.removeImages.bind(this,file)}>Delete</Button>
												</div>
											</div>
											</div>)
									})}
									</div>
									
									
									
									<div><h3>Uploaded vidoes</h3></div>
									<div className="image_block">
									{ this.state.videos.map((file)=>{										
											return (
											<div className="float_class">
											<div>
												<div className="thumbnail" onClick={()=>{alert("Player not integreated.");}}><img src={videoIcon} /></div>
												<div className="text-center">
													<Button size="small" onClick={this.removeVideos.bind(this,file)}>Delete</Button>
												</div>
											</div>
											</div>)
									})}
									</div>
									
								</div>
							
							
							</div>
						</div>
						<div className="row">
								<div className="col-sm-12 text-center">
								<br />
								<Button disabled={this.state.formSubmit}type="submit" size="small" variant="contained" color="primary" className={classes.button} endIcon={<ArrowForwardIosIcon />}>Save</Button></div>
						</div>
						
					</form>
					
						
					</div>
				</div>
				
				
			</div>
		);
	}
	
}
export default Editproject;