import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      am_category_id: '',
      am_product_availablity: '',
      am_product_description: '',
      am_product_id: '',
      am_product_image: '',
      am_product_name: '',
      am_product_offers: '',
      am_product_price: '',
      am_product_rating: '',
      am_product_return_policy: '',
      am_sub_category_id: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('product').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const productDetails = doc.data();
        this.setState({
          key: doc.id,
          am_category_id: productDetails.am_category_id,
          am_product_availablity: productDetails.am_product_availablity,
          am_product_description: productDetails.am_product_description,
          am_product_id: productDetails.am_product_id,
          am_product_image: productDetails.am_product_image,
          am_product_name: productDetails.am_product_name,
          am_product_offers: productDetails.am_product_offers,
          am_product_price: productDetails.am_product_price,
          am_product_rating: productDetails.am_product_rating,
          am_product_return_policy: productDetails.am_product_return_policy,
          am_sub_category_id: productDetails.am_sub_category_id,
        });
      } else {
        console.log("No such Product Found!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({product:state});
  }

  handleImageChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const state = this.state
      state['imageUrl'] = image;
      this.setState(state);
    }
  };

  handleImageUpload = (e) => {
    e.preventDefault();
    const state = this.state;
    const image = state.imageUrl;
    const uploadTask = firebase.storage().ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        firebase.storage()
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            const state = this.state
            state['am_product_image'] = url;
            this.setState(state);
          });
      }
    );
  };

  onSubmit = (e) => {
    e.preventDefault();

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
      am_sub_category_id } = this.state;

    const updateRef = firebase.firestore().collection('product').doc(this.state.key);
    updateRef.set({
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
    }).then((docRef) => {
      this.setState({
        key: '',
        am_category_id: '',
        am_product_availablity: '',
        am_product_description: '',
        am_product_id: '',
        am_product_image: '',
        am_product_name: '',
        am_product_offers: '',
        am_product_price: '',
        am_product_rating: '',
        am_product_return_policy: '',
        am_sub_category_id: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading" style={{marginTop: 16}}>
            <h4><Link to={`/show/${this.state.key}`} className="btn btn-primary">Back to Product Details</Link></h4>
            <h3 className="panel-title">
              Edit Product Details
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
            <label htmlFor="am_category_id" style={{fontWeight: '600'}} >Category Name:</label>
            <input type="text" className="form-control" name="am_category_id" value={this.state.am_category_id} style={{color: 'black'}} onChange={this.onChange} placeholder="Electronics" />
          </div>
          <div className="form-group">
            <label htmlFor="am_sub_category_id" style={{fontWeight: '600'}} >Sub-Category Name:</label>
            <input type="text" className="form-control" name="am_sub_category_id" value={this.state.am_sub_category_id} style={{color: 'black'}} onChange={this.onChange} placeholder="Mobiles & Tablets" />
          </div>
          <div className="form-group">
            <label htmlFor="am_product_name" style={{fontWeight: '600'}} >Product Name:</label>
            <input type="text" className="form-control" name="am_product_name" value={this.state.am_product_name} style={{color: 'black'}} onChange={this.onChange} placeholder="Nokia 1100" />
          </div>
          <div className="form-group">
            <label htmlFor="am_product_description" style={{fontWeight: '600'}} >Description:</label>
            <textArea className="form-control" name="am_product_description" style={{color: 'black'}} onChange={this.onChange} placeholder="Cheap and Handy Mobile. Robust in ..." cols="80" rows="3">{this.state.am_product_description}</textArea>
          </div>
          <div className="form-group">
            <label htmlFor="am_product_price" style={{fontWeight: '600'}} >Price:</label>
            <input type="number" className="form-control" name="am_product_price" value={this.state.am_product_price} style={{color: 'black'}} onChange={this.onChange} placeholder="$42.99" />
          </div>
          <div className="form-group">
            <label htmlFor="am_product_availablity" style={{fontWeight: '600'}} >Available Stocks:</label>
            <input type="number" className="form-control" name="am_product_availablity" value={this.state.am_product_availablity} style={{color: 'black'}} onChange={this.onChange} placeholder="1098" />
          </div>
          <div className="form-group">
            <label htmlFor="am_product_offers" style={{fontWeight: '600'}} >Offer Details:</label>
            <textArea className="form-control" name="am_product_offers" style={{color: 'black'}} onChange={this.onChange} placeholder="5% Cashback for HDFC Credit..." cols="80" rows="3">{this.state.am_product_offers}</textArea>
          </div>
          <div className="form-group">
            <label htmlFor="am_product_rating" style={{fontWeight: '600'}} >Ratings:</label>
            <textArea className="form-control" name="am_product_rating" style={{color: 'black'}} onChange={this.onChange} placeholder="Worthy Buy..." cols="80" rows="3">{this.state.am_product_rating}</textArea>
          </div>
          <div className="form-group">
            <label htmlFor="am_product_return_policy" style={{fontWeight: '600'}} >Return Policy:</label>
            <textArea className="form-control" name="am_product_return_policy" style={{color: 'black'}} onChange={this.onChange} placeholder="30 days Return..." cols="80" rows="3">{this.state.am_product_return_policy}</textArea>
          </div>
          <div className="form-group">
            <label>Product Image:</label>
            <div style={{display: 'flex'}}>
              <div id='uploader'>
                <div className="btn" style={{paddingLeft: 'unset'}}>
                  <input type="file" onChange={this.handleImageChange} />
                </div>
                <progress value={this.state.progress} style={{width: '90%', height: '4px', marginBottom: '4px'}} max="100" className="progress" />
                <button onClick={this.handleImageUpload} className="waves-effect waves-light btn" style={{border: '1px solid #b7b6b6'}}> Upload </button>
              </div>
              <div id='previewer' style={{marginLeft: '200px'}}>
                <div>Uploaded Image</div>
                  <img src={this.state.am_product_image || "https://icons.iconarchive.com/icons/ccard3dev/dynamic-yosemite/1024/Preview-icon.png"} alt="Uploaded Images" height="100" width="120" />
                </div>
              </div>
          </div>
            <button type="submit" className="btn btn-success">Submit</button>
        </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
