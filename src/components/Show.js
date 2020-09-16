import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('product').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          product: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such Product Found!");
      }
    });
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
          <div className="panel-heading" style={{marginTop: 16, marginBottom: 12}}>
          <h4><Link to="/" className="btn btn-primary">Back to Home</Link></h4>
          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '16px'}}>
            <h3 className="panel-title">
              {this.state.product.am_product_name}
            </h3>
            <div>
              <Link to={`/edit/${this.state.key}`} className="btn btn-success">Edit</Link>&nbsp;
              <button onClick={this.delete.bind(this, this.state.key)} className="btn btn-danger">Delete</button>
            </div>
          </div>
          </div>
          <div className="panel-body" >
          <div id='previewer' style={{marginBottom: 8}}>
            <div style={{fontWeight: '600', marginBottom: 8}}>Product Preview:</div>
            <div  style={{marginLeft: '32px'}}>
              <img src={this.state.product.am_product_image || "https://icons.iconarchive.com/icons/ccard3dev/dynamic-yosemite/1024/Preview-icon.png"} alt="Uploaded Images" height="100" width="120" />
            </div>
          </div>
            <dl>
              <dt>Category Name:</dt>
              <dd style={{marginLeft: '32px'}}>{(this.state.product.am_category_id !== undefined && this.state.product.am_category_id !== null && this.state.product.am_category_id !== '') ? this.state.product.am_category_id : '-' }</dd>
              <dt>Sub-Category Name:</dt>
              <dd style={{marginLeft: '32px'}}>{(this.state.product.am_sub_category_id !== undefined && this.state.product.am_sub_category_id !== null && this.state.product.am_sub_category_id !== '') ? this.state.product.am_sub_category_id : '-' }</dd>
              <dt>Description:</dt>
              <dd style={{marginLeft: '32px'}}>{(this.state.product.am_product_description !== undefined && this.state.product.am_product_description !== null && this.state.product.am_product_description !== '') ? this.state.product.am_product_description : '-' }</dd>
              <dt>Price:</dt>
              <dd style={{marginLeft: '32px'}}>{(this.state.product.am_product_price !== undefined && this.state.product.am_product_price !== null && this.state.product.am_product_price !== '') ? this.state.product.am_product_price : '-' }</dd>
              <dt>Available Stocks:</dt>
              <dd style={{marginLeft: '32px'}}>{(this.state.product.am_product_availablity !== undefined && this.state.product.am_product_availablity !== null && this.state.product.am_product_availablity !== '') ? this.state.product.am_product_availablity : '-' }</dd>
              <dt>Offer Details:</dt>
              <dd style={{marginLeft: '32px'}}>{(this.state.product.am_product_offers !== undefined && this.state.product.am_product_offers !== null && this.state.product.am_product_offers !== '') ? this.state.product.am_product_offers : '-' }</dd>
              <dt>Ratings:</dt>
              <dd style={{marginLeft: '32px'}}>{(this.state.product.am_product_rating !== undefined && this.state.product.am_product_rating !== null && this.state.product.am_product_rating !== '') ? this.state.product.am_product_rating : '-' }</dd>
              <dt>Return Policy:</dt>
              <dd style={{marginLeft: '32px'}}>{(this.state.product.am_product_return_policy !== undefined && this.state.product.am_product_return_policy !== null && this.state.product.am_product_return_policy !== '') ? this.state.product.am_product_return_policy : '-' }</dd>
            </dl>
          </div>
          <div>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
