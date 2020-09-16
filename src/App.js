import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('product');
    this.unsubscribe = null;
    this.state = {
      product: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const product = [];
    querySnapshot.forEach((doc) => {
      const { am_category_id,
        am_product_availablity,
        am_product_description,
        am_product_id,
        am_product_image,
        am_product_name,
        am_product_offers,
        am_product_price,
        am_product_rating,
        am_product_return_policy,
        am_sub_category_id } = doc.data();
        product.push({
        key: doc.id,
        doc, // DocumentSnapshot
        am_category_id,
        am_product_availablity,
        am_product_description,
        am_product_id,
        am_product_image,
        am_product_name,
        am_product_offers,
        am_product_price,
        am_product_rating,
        am_product_return_policy,
        am_sub_category_id
      });
    });
    this.setState({
      product
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  delete(id){
    firebase.firestore().collection('product').doc(id).delete().then(() => {
      console.log("Product successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing product: ", error);
    });
  }

  render() {
    return (
      <div className="container" style={{maxWidth: window.innerWidth - 44}}>
        <div className="panel panel-default">
          <div className="panel-heading" style={{display: 'flex', justifyContent: 'space-between', marginTop: '16px'}}>
            <h3>Opus-Trial-kart Product Availablity</h3>
            <h4><Link to="/create" className="btn btn-primary">Add Product</Link></h4>
          </div>
          <div className="panel-body">
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Preview</th>  
                  <th>Description</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Offers</th>
                  <th>Category</th>
                  <th>Sub Category</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.product.map(productDetails =>
                  <tr id={productDetails.key} key={productDetails.key}>
                    <td>
                      <Link to={`/show/${productDetails.key}`}>
                        {(productDetails.am_product_name !== undefined && productDetails.am_product_name !== null && productDetails.am_product_name !== '') ? productDetails.am_product_name : '-' }
                      </Link>
                    </td>
                    <td>
                      <img src={productDetails.am_product_image || "https://icons.iconarchive.com/icons/ccard3dev/dynamic-yosemite/1024/Preview-icon.png"} alt="Uploaded Images" height="30" width="35" />
                    </td>  
                    <td>
                      <div style={{textOverflow: 'ellipsis',overflowX: 'hidden',whiteSpace: 'nowrap',maxWidth: '200px'}}>
                        <span title={(productDetails.am_product_description !== undefined && productDetails.am_product_description !== null && productDetails.am_product_description !== '') ? productDetails.am_product_description : '-'}>
                          {(productDetails.am_product_description !== undefined && productDetails.am_product_description !== null && productDetails.am_product_description !== '') ? productDetails.am_product_description : '-'}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div style={{textOverflow: 'ellipsis',overflowX: 'hidden',whiteSpace: 'nowrap',maxWidth: '200px'}}>
                      <span title={(productDetails.am_product_price !== undefined && productDetails.am_product_price !== null && productDetails.am_product_price !== '') ? productDetails.am_product_price : '-'}>
                        {(productDetails.am_product_price !== undefined && productDetails.am_product_price !== null && productDetails.am_product_price !== '') ? productDetails.am_product_price : '-'}
                      </span>
                      </div>
                    </td>
                    <td>
                      <div style={{textOverflow: 'ellipsis',overflowX: 'hidden',whiteSpace: 'nowrap',maxWidth: '200px'}}>
                      <span title={(productDetails.am_product_availablity !== undefined && productDetails.am_product_availablity !== null && productDetails.am_product_availablity !== '') ? productDetails.am_product_availablity : '-'}>
                        {(productDetails.am_product_availablity !== undefined && productDetails.am_product_availablity !== null && productDetails.am_product_availablity !== '') ? productDetails.am_product_availablity : '-'}
                      </span>
                      </div>
                    </td>
                    <td>
                      <div style={{textOverflow: 'ellipsis',overflowX: 'hidden',whiteSpace: 'nowrap',maxWidth: '200px'}}>
                      <span title={(productDetails.am_product_offers !== undefined && productDetails.am_product_offers !== null && productDetails.am_product_offers !== '') ? productDetails.am_product_offers : '-'}>
                        {(productDetails.am_product_offers !== undefined && productDetails.am_product_offers !== null && productDetails.am_product_offers !== '') ? productDetails.am_product_offers : '-'}
                      </span>
                      </div>
                    </td>
                    <td>
                      <div style={{textOverflow: 'ellipsis',overflowX: 'hidden',whiteSpace: 'nowrap',maxWidth: '150px'}}>
                        <span title={(productDetails.am_category_id !== undefined && productDetails.am_category_id !== null && productDetails.am_category_id !== '') ? productDetails.am_category_id : '-'}>
                          {(productDetails.am_category_id !== undefined && productDetails.am_category_id !== null && productDetails.am_category_id !== '') ? productDetails.am_category_id : '-'}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div style={{textOverflow: 'ellipsis',overflowX: 'hidden',whiteSpace: 'nowrap',maxWidth: '200px', minWidth: '103px'}}>
                        <span title={(productDetails.am_sub_category_id !== undefined && productDetails.am_sub_category_id !== null && productDetails.am_sub_category_id !== '') ? productDetails.am_sub_category_id : '-'}>
                        {(productDetails.am_sub_category_id !== undefined && productDetails.am_sub_category_id !== null && productDetails.am_sub_category_id !== '') ? productDetails.am_sub_category_id : '-'}
                        </span>
                      </div>
                    </td>
                    <td>
                      <Link to={`/edit/${productDetails.key}`}>{'Edit'}</Link>
                    </td>
                    <td>
                      <button onClick={this.delete.bind(this, productDetails.key)} className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
