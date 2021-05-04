import React from 'react'
import '../App.css'
import firebase from '../config.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'


class AddProduct extends React.Component{
    constructor(props){
        super(props);
        this.ref=firebase.firestore().collection('Products');
        this.state={
            name:'',
            description:'',
            url:'',
            image:null,
            check:0,

        
        }
        

    }
    onChange=(e)=>
    {
        const state=this.state;
        state[e.target.name]=e.target.value;
        this.setState(state);
    }

    handleChange=(e)=>{
        if(e.target.files[0]){
            this.setState({
                image:e.target.files[0]
            })
        }
        console.log(e.target.files[0])
    }

    handleUpload=()=>
    {
        this.setState({check:1})
        const {image}=this.state;
        const uploadTask=firebase.storage().ref('images/'+ (image.name)).put(this.state.image);
        uploadTask.on("state_changed ",
        snapshot=>{
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
           console.log('Upload is ' + progress + '% done');
        } ,               
        error=>{console.log(error);},
        ()=>{  uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            this.setState({url})
          });
        })
            /*{console.log(url)}
               this.setState({url})  uploadTask.snapshot.ref.getDownloadURL()*/
    }
    onSubmit=(e)=>
    {
        if(this.state.check===1){
            e.preventDefault();
            const{name,description}=this.state;
            this.ref.add({
                name,
                description,
                url:this.state.url
            }).then((docRef)=>{
                this.setState({
                    name:'',
                    description:'',
                    url:''
                });
                this.props.history.push("/")
            })
            .catch((error)=>{
                console.error("Error adding document:",error)
            })
            this.setState({check:0})
        }else{
            alert("Please upload your image first")
        }
    }
    
    render(){
        const{name,description}=this.state;
        const cardStyles={
         width:'40rem',
         height:'auto',
         backgroundColor:'white',
         margin:'auto',
         display:'block',
         marginTop:'60px',
         opacity:1,
         paddingTop:'10px',
         paddingLeft:'20px',
         paddingRight:'20px',
         borderstyle:'outset',
         borderLeft:'50px solid pink',

        }
        return(
            <div>
                <Card style={cardStyles}>
                    <div className="Buttons">
                    <Link to="/">
                    <button class="Edit-Button" >Show Products</button>
                    </Link>
                    </div>

                    <div>
                        <div>
                            <div class="form-group"></div>
                            <label for="name">Product Name:</label>
                            <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="Please Enter Name"/>
                        </div>

                        <div>
                            <div class="form-group"></div>
                            <label for="description">Product Description:</label>
                            <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description} </textArea>
                        </div>      
                    
                    </div>

                    <div class="upload-btn-wrapper">
                        <button class="file-btn">Choose a file</button>
                        <input type ="file" onChange={this.handleChange}/>
                    </div>

                    <div className="upload-data">
                        <img src={this.state.url} height="200" width="200" alt=""/>
                       
                    </div>  

                    <div className="Buttons">
                        <button class="Submit-Button" onClick={this.handleUpload}>Upload image first</button>
                        <button class="Submit-Button" onClick={this.onSubmit}>save all</button>
                    </div>   

                </Card>
            </div>
        )
    }
}
export default AddProduct