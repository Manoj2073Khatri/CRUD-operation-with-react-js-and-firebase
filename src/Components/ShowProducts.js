import React from 'react'
import '../App.css'
import firebase from '../config.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class ShowProduct extends React.Component{
    constructor(props){
          super(props);
          this.state={
            product:[],
            key:''
        }

    }
    componentDidMount(){
         const ref=firebase.firestore().collection('Products').doc(this.props.match.params.id);
         ref.get().then((doc)=>{

            if(doc.exists){
                this.setState({
                    product:doc.data(),
                    key:doc.id,
                    isLoading:false         
                })
            }      
            else{
                console.log("no such document is here!")
               }
         })
    }
    delete(id){

        var desertRef=firebase.storage().refFromURL(this.state.product.url)
        firebase.firestore().collection('Products').doc(id).delete().then(()=>{
            console.log("document is succesfully dleted.")
            this.props.history.push('/')
           }).catch((error)=>{
              console.error("Error is",error);
           })
           desertRef.delete().then(function(){
           console.log("file deleted")
           }).catch(error=>{
           console.log('error while deleting file')
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
            paddingRight:'20px',
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
                        <img src={this.state.product.url} height="200" width="200" alt=""/>
                        
                    </div>  

                    <div class="container">
                        <div class="panel panel-default">
                            <h3 class="panel panel-title">{this.state.product.name}</h3>
                        </div>

                        <div class="panel-body">
                            <dl>
                                <dt>Description</dt>
                                <dd>{this.state.product.description}</dd>
                            </dl>

                            <Link to ={'/edit/'+(this.state.key)} class="btn btn-success">Edit</Link>
                            <button onClick={this.delete.bind(this,this.state.key)} class="btn btn-danger">Delete</button>
                        </div>

                    </div>
                </Card>
            </div>
        )
    }
}
export default ShowProduct