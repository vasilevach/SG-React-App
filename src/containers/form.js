import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, Text, Select } from 'react-form';
import { Button, Container } from 'reactstrap';

export default class ProductsForm extends Component {

  render() {
    let isEdit = (this.props.productData !== null) ? true : false;

    return (

      <Container>
        <Form
          ref="addProductForm"

          defaultValues = {this.props.productData}

          onSubmit={(values) => {
            this.props.onSubmit(values, isEdit);
            this.refs.addProductForm.resetForm();
          }}

          validate={({ name, price, currency }) => {
            return {
              name: !name ? 'Product name is required' : undefined,
              price: (!price || (isNaN(price) || (price === " ")))  ? 'Product price is required number value' : undefined,
              currency: !currency ? 'Select a currency' : undefined
            }
          }}
          >

          {({submitForm}) => {
            return (
              <form onSubmit={submitForm} className="product-form">
                <div className="half">
                  <label>Product name: </label>
                  <Text field='name' disabled={isEdit}/>
                </div>
                <div className="half">
                  <label>Product price: </label>
                  <Text field='price' />
                </div>
                <label>Currency: </label>
                <Select
                  field='currency'
                  options={[{
                    label: 'USD',
                    value: 'USD'
                  }, {
                    label: 'BGN',
                    value: 'BGN'
                  }, {
                    label: 'GBP',
                    value: 'GBP'
                  }]}
                />
                <Button type='submit' color="primary">Add product</Button>
              </form>
            )
          }}
        </Form>
      </Container>
    )

  }
}
