import { Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import styled from 'styled-components';

const CloseIcon = () => {
    return (
        <StyledCloseIcon>
            <CloseOutlined />
        </StyledCloseIcon>
    )
}

const BaseModal = ({visible, children, onCancel}) => {
    return (
        <StyledModal
            visible={visible}
            closeIcon={<CloseIcon />}
            footer={null}
            onCancel={onCancel}
            bodyStyle={{display: 'flex'}}   
        >
            {children}
        </StyledModal>
    )
};

export default BaseModal;

const StyledModal = styled(Modal)`
    background-color: #E5E5E5;
    padding: 0;
    border-radius: 2rem;
    .ant-modal-content {
        border-radius: 2rem;
    }
`;

const StyledCloseIcon = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
    margin-top: 1.5rem;
    margin-right: 1.5rem;
    &:hover {
        background-color: #F6F8F9
    }
`;
