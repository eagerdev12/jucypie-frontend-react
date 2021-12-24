import BaseModal from './BaseModal';
import SignUpForm from './SignUpConent';

const LoginModal = ({visible, onCancel}) => {
    return (
        <BaseModal
            visible={visible}
            onCancel={onCancel}
        >
            <SignUpForm />
        </BaseModal>
    )
};

export default LoginModal;
