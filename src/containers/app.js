import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadApp } from 'actions/app';
import { loadPermissions } from 'actions/permissions';
import { createProduct, editProduct } from 'actions/products';
import { Button, Modal, ModalHeader, ModalBody, Container } from 'reactstrap';


import List from './list';
import ProductsForm from './form.js';

type Props = {
  dispatch: () => void,
  loaded: boolean
}

export class AppContainer extends Component {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      modalOpened: false,
      productData: null
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(loadApp());
    this.props.dispatch(loadPermissions());
  }

  onSubmit(productData, isEdit) {
    if(isEdit) {
      this.props.dispatch(editProduct(productData));
    }
    else {
      var productIsFound = false;
      console.log('this.props.products', this.props.products)
      for(var i = 0; i < this.props.products.length; i++) {
        console.log(this.props.products[i].name, productData.name);
        if(this.props.products[i].name == productData.name) {
          productIsFound = true;
          break;
        }
      }
      if(productIsFound){
        alert('There is already a product with that name!');
        return;
      }
      this.props.dispatch(createProduct(productData));
    }

    this.setState({
      modalOpened: false,
      productData: null
    });
  }

  toggleModal() {
    this.setState({
      modalOpened: !this.state.modalOpened
    });
  }

  onEdit(productData) {
    this.setState({
      modalOpened: true,
      productData: productData
    });
  }

  render() {
    if (!this.props.loaded) {
      return null;
    }

    if(this.props.permissions.indexOf('READ') != -1) {

      return (
        <Container>
          <h1>Products list:</h1>

          <List onEdit={this.onEdit} />

          {(this.props.permissions.indexOf('CREATE') != -1) &&
            <div>
              <Button onClick={()=>{this.setState({modalOpened:true, productData:null})}} color="primary">ADD PRODUCT</Button>
              <Modal isOpen={this.state.modalOpened} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Product modal</ModalHeader>
                <ModalBody>
                  <ProductsForm productData={this.state.productData} onSubmit={this.onSubmit}/>
                </ModalBody>
              </Modal>
            </div>
          }
        </Container>
      );
    } else {
      return (
        <Container>
          <div>You do not have permissions to see this page</div>
        </Container>
      )
    }

  }
}

function mapStateToProperties(state) {
  return {
    loaded: state.app.loaded,
    permissions: state.permissions.permissions,
    products: state.products.products
  };
}

export default connect(mapStateToProperties)(AppContainer);
