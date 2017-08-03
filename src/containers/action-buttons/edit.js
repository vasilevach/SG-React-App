import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from 'reactstrap';

export class EditButton extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onEdit();
  }

  render() {
    return <Button onClick={this.onClick} color="info">edit</Button>;
  }
}

function mapStateToProperties(state) {
  return {};
}

export default connect(mapStateToProperties)(EditButton);
