import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { siteConfig } from '../../settings';
import { Modal, Button, Dropdown, Menu, Icon, message, Carousel, Form, Input, Checkbox, Tooltip} from 'antd';
import { connect } from 'react-redux';
const FormItem = Form.Item;

class StoreNameForm extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submitStoreName(values.store_name)
        this.props.next()
      }
    });
  }

  // storeNameOnChange(e) {
  //   this.props.submitStoreName(e.target.value)
  // }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 24,
          offset: 0,
        },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Store name:&nbsp;
              <Tooltip title="What do you want your store to be called?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('store_name', {
            initialValue: this.props.store_name ? this.props.store_name : '',
            rules: [{ required: true, message: 'Please input your store name!', whitespace: true }],
          })(
            <Input/>
          )}
        </FormItem>

        <Button onClick={this.props.prev}>Previous</Button>

        <FormItem >
          <Button type="primary" htmlType="submit" className="login-form-button">
            Next
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedStoreNameForm = Form.create()(StoreNameForm);
export default WrappedStoreNameForm;
