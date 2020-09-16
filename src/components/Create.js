import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('product');
    this.state = {
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
        am_sub_category_id: '',
        errors: []
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
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

  validateSubmission = (productName, productPrice) => {
    const errors = [];
    if (productName === undefined || productName === null || productName === '') {
      errors.push("Product Name can't be empty");
    }

    if (productPrice === undefined || productPrice === null || productPrice === '') {
      errors.push("Product Price should be zero or greater than zero");
    }
    return errors;
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

    const errors = this.validateSubmission(am_product_name, am_product_price);
    if (errors.length > 0) {
      const state = this.state
      state['errors'] = errors;
      this.setState(state);
      window.scrollTo(0, 0);
      return;
    }
    else
    {
      this.ref.add({
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
          am_sub_category_id: '',
          errors: []
        });
        this.props.history.push("/")
      })
      .catch((error) => {
        console.error("Error adding product: ", error);
      });
    }
  }

  render() {
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
    const { errors } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Add Product to Opus-Trial-kart Store
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Back to Home</Link></h4>
            <form onSubmit={this.onSubmit}>
            {errors.map(error => (
              <p key={error} style={{color: 'red'}}>Error: {error}</p>
            ))}
              <div class="form-group">
                <label for="am_category_id" style={{fontWeight: '600'}} >Category Name:</label>
                <input type="text" class="form-control" name="am_category_id" value={am_category_id} style={{color: 'black'}} onChange={this.onChange} placeholder="Electronics" />
              </div>
              <div class="form-group">
                <label for="am_sub_category_id" style={{fontWeight: '600'}} >Sub-Category Name:</label>
                <input type="text" class="form-control" name="am_sub_category_id" value={am_sub_category_id} style={{color: 'black'}} onChange={this.onChange} placeholder="Mobiles & Tablets" />
              </div>
              <div class="form-group">
                <label for="am_product_name" style={{fontWeight: '600'}} >Product Name:</label>
                <input type="text" class="form-control" name="am_product_name" value={am_product_name} style={{color: 'black'}} onChange={this.onChange} placeholder="Nokia 1100" />
              </div>
              <div class="form-group">
                <label for="am_product_description" style={{fontWeight: '600'}} >Description:</label>
                <textArea class="form-control" name="am_product_description" style={{color: 'black'}} onChange={this.onChange} placeholder="Cheap and Handy Mobile. Robust in ..." cols="80" rows="3">{am_product_description}</textArea>
              </div>
              <div class="form-group">
                <label for="am_product_price" style={{fontWeight: '600'}} >Price:</label>
                <input type="number" class="form-control" name="am_product_price" value={am_product_price} style={{color: 'black'}} onChange={this.onChange} placeholder="$42.99" />
              </div>
              <div class="form-group">
                <label for="am_product_availablity" style={{fontWeight: '600'}} >Available Stocks:</label>
                <input type="number" class="form-control" name="am_product_availablity" value={am_product_availablity} style={{color: 'black'}} onChange={this.onChange} placeholder="1098" />
              </div>
              <div class="form-group">
                <label for="am_product_offers" style={{fontWeight: '600'}} >Offer Details:</label>
                <textArea class="form-control" name="am_product_offers" style={{color: 'black'}} onChange={this.onChange} placeholder="5% Cashback for HDFC Credit..." cols="80" rows="3">{am_product_offers}</textArea>
              </div>
              <div class="form-group">
                <label for="am_product_rating" style={{fontWeight: '600'}} >Ratings:</label>
                <textArea class="form-control" name="am_product_rating" style={{color: 'black'}} onChange={this.onChange} placeholder="Worthy Buy..." cols="80" rows="3">{am_product_rating}</textArea>
              </div>
              <div class="form-group">
                <label for="am_product_return_policy" style={{fontWeight: '600'}} >Return Policy:</label>
                <textArea class="form-control" name="am_product_return_policy" style={{color: 'black'}} onChange={this.onChange} placeholder="30 days Return..." cols="80" rows="3">{am_product_return_policy}</textArea>
              </div>
              <div class="form-group">
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
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
