import React from 'react'
import '../App.css'
import firebase from '../config.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class EditProduct extends React.Component{
    constructor(props){
        super(props);
        this.state={
            key:'',
            name:'',
            description:'',
            url:'',
            image:null
        }

    }
    componentDidMount(){
        const ref=firebase.firestore().collection('Products').doc(this.props.match.params.id);
        ref.get().then((doc)=>{

           if(doc.exists){
               const document=doc.data()
               this.setState({
                   key:doc.id,
                   name:document.name,
                   description:document.description,
                   url:document.url
                         
               })
           }      
           else{
               console.log("no such document is here!")
              }
        })
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
        const{image,url}=this.state;
        var desertRef=firebase.storage().refFromURL(url)
       
        const uploadTask=firebase.storage().ref('images/'+(image.name)).put(this.state.image)
        uploadTask.on("state_changed",snapshot=>{
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
        error=>{console.log(error);},
        ()=>{uploadTask.snapshot.ref.getDownloadURL().then(url=> this.setState({url}) )})
            /*{console.log(url)}   this.setState({url})*/
        /*desertRef.delete().then(function(){
            console.log("file deleted")
            }).catch(function(error){
            console.log('error while deleting file')
            })*/
        desertRef.delete().then(function(){
            console.log("file deleted")
            }).catch(error=>{
            console.log('error while deleting file')
            })
    
    }

    onChange=(e)=>
    {
        const state=this.state;
        state[e.target.name]=e.target.value;
        this.setState({document:state});
    }
    onSubmit=(e)=>
    {
        e.preventDefault();
        const{name,description,url}=this.state;
        const updateRef=firebase.firestore().collection('Products').doc(this.state.key);

        updateRef.set({
            name,
            description,
            url
        }).then((docRef)=>{
            this.setState({
                key:'',
                name:'',
                description:'',
                url:''
            });
            this.props.history.push("/show/"+this.props.match.params.id)
        })
        .catch((error)=>{
            console.error("Error editing  document:",error)
        })
    }
    render(){
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
            paddingRight:'10px',
            borderstyle:'outset',
            borderLeft:'50px solid pink'
   
           }
        return(
            <div>
                <Card style={cardStyles}>
                    <div className="Buttons">
                        <Link to="/">
                        <button class="Edit-Button" >Show Products</button>
                        </Link>
                    </div>

                    <div className="upload-data">
                        <img src={this.state.url} height="200" width="200" alt=""/>
                        
                    </div>  

                    <div class="upload-btn-wrapper">
                        <button class="file-btn">Choose a file</button>
                        <input type ="file" onChange={this.handleChange}/>
                    </div>

                    <div className="Buttons">
                        <button class="Submit-Button" onClick={this.handleUpload}>Upload image first</button>
                        
                    </div>   

                    <div class="container">
                        <div class="panel panel-default">
                            
                        

                        <div class="panel-body">
                            <form onSubmit={this.onSubmit}>
                               <div>
                                    <div class="form-group"></div>
                                    <label for="name">Product Name:</label>
                                    <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.onChange} placeholder="Please Enter Name"/>
                               </div>

                                <div>
                                    <div class="form-group"></div>
                                    <label for="description">Product Description:</label>
                                    <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{this.state.description} </textArea>
                                </div> 

                                <button type="submit" class="btn btn-success">Submit</button>
                            </form>
                        </div>
                       </div>
                    </div>

                </Card>
            </div>

        )
    }
}
export default EditProduct