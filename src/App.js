import React from 'react'
import './App.css'
import firebase from './config.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class App extends React.Component{

     constructor(props){

                    super(props);
                    this.ref=firebase.firestore().collection("Products");
                    this.unsubscribe=null;
                    this.state={
                    products:[]
                 };

                }

     componentDidMount(){

                    this.unsubscribe=this.ref.onSnapshot(this.onCollectionUpdate);

     }

     onCollectionUpdate=(querySnapshot)=>{
                    const products=[];
                    querySnapshot.forEach(doc => {

                    const{name,description,url}=doc.data();
                    products.push({
                      key:doc.id,
                      doc,
                      name,
                      description,
                      url
                   })  ;    
                });
      
                    this.setState({
                       products
                     });
    }
     render(){
       const cardStyles={
         width:'auto',
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
         borderLeft:'50px solid black',
         borderRadius:'20px'
       }
       return(
            <div>
                  <Card style={cardStyles}>
                        <div className="Buttons">
                            <Link to="/create">
                              <button class="Add-Button" varient='flat' size='small'>Add Products</button>
                            </Link>
                        </div>

                        <div class="container">
                            <div class="panel panel-heading">
                            <h3 class="panel-heading">Product Details</h3>
                            </div>

                        </div>

                        <div class="panel-body">
                              <table class="table table-stripe">
                                    <thead>
                                        <tr>
                                          <th>Product Name</th>
                                          <th>Description</th>
                                          <th>Image</th>
                                        </tr>
                                    </thead>

                                    <tbody> 
                                          {this.state.products.map(
                                            product=>
                                                <tr>
                                                    <td><Link to={'/show/'+(product.key)}>{product.name}</Link></td>
                                                    <td>{product.description}</td>
                                                    <td><img src={product.url} width="100px" height="100px" alt=""></img></td>
                                                </tr>
                                          )}
                                    </tbody>
                              </table>
                        </div>
                  </Card>
            </div>

       )
     }
}
export default App