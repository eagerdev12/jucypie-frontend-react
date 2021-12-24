import React from 'react';
import styled from 'styled-components';
import { Card, Typography, Rate, Row } from 'antd';
import { Toolkit, VectorIcon } from '../../atoms';

const Product = ({ image, offPercent, price, badge, title, like, star, sold, orientation = 'vertical' }) => {
  return (
    <ProductCard bordered={false}>
      <ProductBody orientation={orientation}>
        <ProductImage src={image} orientation={orientation} />
        <DiscountBadge>-{offPercent}%</DiscountBadge>
        <ProductContent>
          <ProductTitle>
            {title}
          </ProductTitle>
          {/* <Row align='middle'>
            <StyledRate value={4.5} allowHalf={true} />
            <RateValue>360</RateValue>
          </Row> */}
          <ProductPrice>{price}</ProductPrice>
          <DownBadge>
            {badge}
          </DownBadge>
          <ProductFooter>
            <Toolkit
              icon={<VectorIcon name='MobileLike' width={13} height={13} />}
              title={like}
              active={false}
              noMargin={true}
            />
            <Toolkit icon={<VectorIcon name='Star' width={13} height={13} />} active={false} title={star} noMargin={true} />
            <Toolkit icon={<VectorIcon name='Cart' width={13} height={13} />} active={false} title={sold} noMargin={true} />
          </ProductFooter>
        </ProductContent>
      </ProductBody>
    </ProductCard>
  );
};

const ProductCard = styled(Card)`
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  .ant-card-body {
    padding: 0;
  }
`;

const ProductBody = styled(Row)`
  position: relative;
  flex-direction: ${(props) =>
    props.orientation === 'vertical' ? 'column' : 'row'};
  @media only screen and (min-width: 450px) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

const ProductContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 5px;
  white-space: nowrap;
`;

const ProductImage = styled.img`
  ${(props) => props.orientation === 'vertical' ? 'width: 100%;' : 'height: auto;'}
  object-fit: cover;
  @media only screen and (min-width: 450px) {
    width: 220px;
    margin: 0 auto;
  }
`;

const ProductTitle = styled(Typography.Text)`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 145%;
  color: #404950;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 23px;
  @media only screen and (min-width: 450px) {
    font-size: 15px;
  }
`;

const ProductPrice = styled(Typography.Text)`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
  color: #404950;
  margin-top: 5px;
  margin-bottom: 15px;
  @media only screen and (min-width: 450px) {
    font-size: 17px;
    line-height: 17px;
  }
`;

const DownBadge = styled.span`
  padding: 2px 6px 2px 7px;
  background: rgba(248, 99, 0, 0.15);
  font-weight: bold;
  font-size: 11px;
  line-height: 150%;
  border-radius: 3px;
  color: #f86300;
  width: fit-content;
`;

const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${(props) =>
    props.orientation === 'vertical' ? '2rem' : '1rem'};
  margin-bottom: 14px;
  margin-top: 50px;
  @media only screen and (max-width: 451px) {
    margin-top: 30px;
  }
`;

const DiscountBadge = styled.div`
  width: 40px;
  height: 24px;
  background: #E93E09;
  border-radius: 29px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  left: 15px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  line-height: 11px;
  color: #FFFFFF;
  @media only screen and (max-width: 451px) {
    left: 5px;
  }
`;

export default Product;
