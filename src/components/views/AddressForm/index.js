import React from 'react';
import styled from 'styled-components';
import { Typography, Button, Col, Row, Form } from 'antd';
import { InputText, TCheckbox } from '../../atoms';

const AddressForm = ({ title }) => {
  return (
    <Panel>
      <FormTitle>{title}</FormTitle>
      <StyledForm>
        <StyledFormItem>
          <InputText name='address' placeholder='Address' />
        </StyledFormItem>
        <StyledFormItem>
          <Row gutter={12}>
            <Col span={12}>
              <InputText name='country' placeholder='Country' />
            </Col>
            <Col span={12}>
              <InputText name='state' placeholder='State' />
            </Col>
          </Row>
        </StyledFormItem>

        <StyledFormItem>
          <Row gutter={12}>
            <Col span={12}>
              <InputText name='city' placeholder='City' />
            </Col>
            <Col span={12}>
              <InputText name='zip' placeholder='Zip' />
            </Col>
          </Row>
        </StyledFormItem>

        <StyledFormItem>
          <Row gutter={12}>
            <Col span={12}>
              <InputText name='full_name' placeholder='Full Name' />
            </Col>
            <Col span={12}>
              <InputText name='phone' placeholder='Phone' />
            </Col>
          </Row>
        </StyledFormItem>
      </StyledForm>

      <Row justify='space-between'>
        <TCheckbox label='Primary' />
        <Button type='primary'>Save</Button>
      </Row>
    </Panel>
  );
};

const Panel = styled(Row)`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const FormTitle = styled(Typography.Text)`
  font-size: 19px;
  line-height: 19px;
  margin-bottom: 30px;
  font-weight: bold;
`;

const StyledForm = styled(Form)`
  width: 100%;
`;

const StyledFormItem = styled(Form.Item)`
  width: 100%;
`;

export default AddressForm;
