import React, { Component } from 'react';
import { connect } from 'react-redux';

// import LayoutContentWrapper from '../../components/utility/layoutWrapper';
// import LayoutContent from '../../components/utility/layoutContent';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import PageHeader from '../../components/utility/pageHeader';
import Box from "../../components/utility/box";
import { Row, Col, Steps, Icon, Button, message, Form} from 'antd';
import basicStyle from "../../settings/basicStyle";
import CreateStoreWrapper from "./index.style.js";
import StoreNameForm from './storeNameForm';
import SalesPanel from './salesPanel';

import SocialLink from './socialLink';
import storeAction from '../../redux/store/actions';
import productAction from '../../redux/product/actions';
const {fetchProducts} = productAction
const {submitStoreName, linkSocial} = storeAction
const Step = Steps.Step;

class CreateStore extends Component {

  componentDidMount() {
    this.props.fetchProducts()
  }
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  submitCreateStore() {
    message.success('Processing complete!')
  }

  submitStoreName(storeName) {
    this.props.submitStoreName(storeName)
    this.next()
  }

  linkSocial(socialData) {
    this.props.linkSocial(socialData)
    this.next()
  }

  submitInterest(interests) {
    this.props.submitInterest(interests)
    this.next()
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const steps = [{
      title: 'Social Link',
      content: (
        <SocialLink linkSocial={this.linkSocial.bind(this)} />
      ),
      description: "the store's associated social media account"
    }, {
      title: 'Store name',
      content: (
        <div>
          <h3>
            Store name
          </h3>
          <StoreNameForm submitStoreName={this.submitStoreName.bind(this)}/>
        </div>
      ),
      description: 'setup the storename for your store'
    }, {
      title: 'Products & Categories',
      content: <SalesPanel submitInterest={this.submitInterest} />,
      description: 'pick the categories and products for your store'
    }, {
      title: 'Done',
      content: 'Last-content',
      description: 'check your store'
    }];
    const { current } = this.state;

    return (
      <CreateStoreWrapper>
        <LayoutWrapper>
            <PageHeader>
              Create Store
            </PageHeader>
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={6} sm={24} xs={24}>
                <Box style={{ height: '600px' }}>
                  <Steps direction="vertical" current={current}>
                    {steps.map(item => <Step description={item.description} key={item.title} title={item.title} />)}
                  </Steps>
                </Box>
              </Col>

              <Col md={18} sm={24} xs={24}>
                <Box style={{ height: '600px' }}>
                  <div>
                      <div className="steps-content">{steps[current].content}</div>
                      {/*<div className="steps-action">
                        {
                          current < steps.length - 1
                          && <Button type="primary" onClick={() => this.next()}>Next</Button>
                        }
                        {
                          current === steps.length - 1
                          && <Button type="primary" onClick={this.submitCreateStore}>Done</Button>
                        }
                        {
                          current > 0
                          && (
                          <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            Previous
                          </Button>
                          )
                        }
                      
                      </div>*/}
                  </div>
                </Box>
              </Col>
            </Row>

        </LayoutWrapper>
      </CreateStoreWrapper>

    )
  }
}


export default connect(
  state => ({
    Store: state.Store,
  }),
  { submitStoreName,
    linkSocial,
    fetchProducts
   }
)(CreateStore);

