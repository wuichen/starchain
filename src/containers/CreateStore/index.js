import React, { Component } from 'react';
// import LayoutContentWrapper from '../../components/utility/layoutWrapper';
// import LayoutContent from '../../components/utility/layoutContent';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import PageHeader from '../../components/utility/pageHeader';
import Box from "../../components/utility/box";
import { Row, Col, Steps, Icon, Button, message} from 'antd';
import basicStyle from "../../settings/basicStyle";
import CreateStoreWrapper from "./index.style.js";

const Step = Steps.Step;


export default class extends Component {

  componentDidMount() {
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

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const steps = [{
      title: 'First',
      content: (
        <h1>hey man</h1>
      ),
    }, {
      title: 'Second',
      content: 'Second-content',
    }, {
      title: 'Last',
      content: 'Last-content',
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
                <Steps direction="vertical" current={current}>
                  {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
              </Col>

              <Col md={18} sm={24} xs={24}>
                <Box style={{ minHeight: 500 }}>
                  <div>
                    <div className="steps-content">{steps[current].content}</div>
                    <div className="steps-action">
                      {
                        current < steps.length - 1
                        && <Button type="primary" onClick={() => this.next()}>Next</Button>
                      }
                      {
                        current === steps.length - 1
                        && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
                      }
                      {
                        current > 0
                        && (
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                          Previous
                        </Button>
                        )
                      }
                    </div>
                  </div>
                </Box>
              </Col>
            </Row>

        </LayoutWrapper>
      </CreateStoreWrapper>

    )
  }
}
