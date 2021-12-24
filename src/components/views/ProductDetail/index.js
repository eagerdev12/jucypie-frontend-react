import React from 'react';
import { Row, Col, Button } from 'antd';
import {
  ProductCard,
  ProductBody,
  ProductContent,
  ProductImage,
  StyledRate,
  RateValue,
  ProductTitle,
  ProductPrice,
  DownBadge,
  ProductFooter,
} from './styles';

const ProductDetail = ({ image, price }) => {
  return (
    <ProductCard bordered={false}>
      <ProductBody>
        <ProductImage src={image} />
        <ProductContent>
          <ProductTitle>
            JuicyPie Essentials - Hand Sanitizer - 50ml bottle
          </ProductTitle>
          <Row align='middle'>
            <StyledRate value={4.5} allowHalf={true} />
            <RateValue>360</RateValue>
          </Row>
          <ProductPrice>{price}</ProductPrice>
          <DownBadge>
            80% off, Free Shipping Eligible, Ships from U.S.
          </DownBadge>
          <ProductFooter justify='space-between' align='middle'>
            <Row gutter={20}>
              <Col span={12}>
                <Button>Add to Cart</Button>
              </Col>
              <Col span={12}>
                <Button type='primary'>Buy Now</Button>
              </Col>
            </Row>
          </ProductFooter>
        </ProductContent>
      </ProductBody>
    </ProductCard>
  );
};

export default ProductDetail;
