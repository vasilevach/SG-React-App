import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadProducts } from 'actions/products';

import { Table, Button } from 'reactstrap';
import EditButton from './action-buttons/edit';
import DeleteButton from './action-buttons/delete';

type Props = {
  dispatch: () => void,
  loaded: boolean
}

export class List extends Component {

  props: Props;

  constructor(props) {
    super(props);

    this.renderProductRow = this.renderProductRow.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(loadProducts());
  }

  renderProductRow(product) {
    return (
      <tr key={product.name}>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>{product.currency}</td>
        <td>
          {(this.props.permissions.indexOf('UPDATE') != -1) &&
            <EditButton onEdit={this.props.onEdit.bind(null, product)} />
          }

          {(this.props.permissions.indexOf('DELETE') != -1) &&
            <DeleteButton productName={product.name} />
          }
        </td>
      </tr>
    )
  }

  render() {
    return (
      <div>
        <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Product</th>
            <th>Currency</th>
            <th></th>
          </tr>
        </thead>
          <tbody>
            {this.props.products.map(this.renderProductRow)}
          </tbody>
        </Table>
      </div>
    );
  }
}

function mapStateToProperties(state) {
  return {
    products: state.products.products,
    permissions: state.permissions.permissions
  };
}

export default connect(mapStateToProperties)(List);
