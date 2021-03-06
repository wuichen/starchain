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
import storesAction from '../../redux/stores/actions';
import productsAction from '../../redux/products/actions';
const {fetchProducts} = productsAction
const {submitStoreName, submitStore, linkSocial, submitInterests} = storesAction
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

  submitStoreName(store_name) {
    this.props.submitStoreName(store_name)
  }

  linkSocial(social_data) {
    this.props.linkSocial(social_data)
  }

  submitInterests(interests) {
    this.props.submitInterests(interests)
    this.next()
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const steps = [{
      title: 'Social Link',
      content: (
        <SocialLink next={this.next.bind(this)} social_data={this.props.Stores.editing_store.social_data} linkSocial={this.linkSocial.bind(this)} />
      ),
      description: "the store's associated social media account"
    }, {
      title: 'Store name',
      content: (
        <div>
          <h3>
            Store name
          </h3>
          <StoreNameForm store_name={this.props.Stores.editing_store.store_name} submitStoreName={this.submitStoreName.bind(this)} next={this.next.bind(this)} prev={this.prev.bind(this)}/>
        </div>
      ),
      description: 'setup the storename for your store'
    }, {
      title: 'Products & Categories',
      content: <SalesPanel submitInterests={this.submitInterests.bind(this)} prev={this.prev.bind(this)}/>,
      description: 'pick the categories and products for your store'
    }, {
      title: 'Done',
      content: (
        <div>
          <Button onClick={this.prev.bind(this)}>Previous</Button>
          <Button onClick={this.props.submitStore}>Submit</Button>
        </div>
      ),
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
    Stores: state.Stores,
  }),
  { submitStoreName,
    linkSocial,
    submitInterests,
    fetchProducts,
    submitStore
   }
)(CreateStore);

