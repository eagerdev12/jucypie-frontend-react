import { Card, Typography, Rate, Row } from 'antd';
import styled from 'styled-components';

export const ProductCard = styled(Card)`
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  .ant-card-body {
    padding: 0;
  }
  @media only screen and (max-width: 451px) {
    border-radius: 0px;
  }
`;

export const ProductBody = styled(Row)`
  position: relative;
`;

export const ProductContent = styled(Row)`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1rem;
`;

export const ProductImage = styled.img`
  width: 285px;
  height: 285px;
  object-fit: cover;
  @media only screen and (max-width: 451px) {
    width: 100%;
  }
`;

export const StyledRate = styled(Rate)`
  font-size: 14px;
  .ant-rate-star {
    margin-right: 1px;
  }
`;

export const RateValue = styled(Typography.Text)`
  padding-top: 3px;
  font-size: 13px;
  line-height: 14px;
  padding-left: 5px;
`;

export const ProductTitle = styled(Typography.Text)`
  font-weight: bold;
  font-size: 15px;
  line-height: 150%;
  color: rgba(64, 73, 80, 0.95);
`;

export const ProductPrice = styled(Typography.Text)`
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
  margin-top: 15px;
  margin-bottom: 10px;
`;

export const DownBadge = styled.span`
  padding: 2px 6px 2px 7px;
  background: rgba(248, 99, 0, 0.15);
  font-weight: bold;
  font-size: 11px;
  line-height: 150%;
  width: fit-content;
  border-radius: 3px;
  color: #f86300;
  @media only screen and (max-width: 451px) {
    margin-bottom: 3rem;
  }
`;

export const ProductFooter = styled(Row)`
  margin-top: 1rem;
  position: absolute;
  bottom: 10px;
  right: 6px;
`;
