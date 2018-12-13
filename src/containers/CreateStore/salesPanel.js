import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Steps, Icon, Button, message, Form, Avatar, Select} from 'antd';
const Option = Select.Option;

export default class SalesPanel extends Component {

  componentDidMount() {
  }

  constructor(props) {
    super(props);
    this.state = {
      interests: []
    };
  }

  selectInterest(value) {
    const newInterests = this.state.interests
    console.log(newInterests)
    this.setState({
      interests: newInterests
    })
  }

  submitInterests() {
    this.props.submitInterests(this.state.interests)
  }

  render() {
    const options = []
    const interests = ['fashion', 'work out', 'basketball', 'street wear'];
    for (let i = 0; i < interests.length; i++) {
      options.push(<Option key={interests[i]}>{interests[i]}</Option>);
    }
    return (
      <div>
        <h3>
          Interest
        </h3>
        <Select
          mode="multiple"
          style={{ width: '30%' }}
          placeholder="Please select"
          defaultValue={[]}
          onChange={this.selectInterest.bind(this)}
        >
          {options}
        </Select>
        <br />
        <br />

        <Button type="primary" onClick={this.props.submitInterests}>Next</Button>
      </div>
    )
  }
}