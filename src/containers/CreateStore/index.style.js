import styled from 'styled-components';
import { palette } from 'styled-theme';
import { transition, borderRadius } from '../../settings/style-util';
import WithDirection from '../../settings/withDirection';

const CreateStoreWrapper = styled.div`
  .steps-content {
    margin-top: 16px;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
  .link_instagram {
  	font-size: '200px'
  }
  .steps-action {
    margin-top: 24px;
  }
`;

export default WithDirection(CreateStoreWrapper);
