import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteProduct } from 'actions/products';
import { Modal, ModalHeader, ModalFooter, Button } from 'reactstrap';

export class DeleteButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modalOpened: false
    }

    this.onClick = this.onClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  onClick() {
    this.setState({
      modalOpened: true
    });
  }

  deleteItem() {
    this.props.dispatch(deleteProduct(this.props.productName));
  }

  toggleModal() {
    this.setState({
      modalOpened: !this.state.modalOpened
    });
  }

  render() {
    return (
      <div className="inline">
        <Button onClick={this.onClick} color="danger">delete</Button>
        <Modal isOpen={this.state.modalOpened} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Are you sure you want to delete that?</ModalHeader>
          <ModalFooter>
            <Button color="primary" onClick={this.deleteItem}>Yes</Button>{' '}
            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>);
  }
}

function mapStateToProperties(state) {
  return {};
}

export default connect(mapStateToProperties)(DeleteButton);
