import {Modal, Icon, ModalActions} from "semantic-ui-react"

export default function BasicModal(props) {

    const {show, setShow, title, children, ...rest} = props;

    const onClose = () => setShow(false);

    return (
        <Modal className="basic-modal" open={show} onClose={onClose} {...rest}>
            <Modal.Header>
                <span>{title}</span> <Icon name="close" onClick={onClose}></Icon>
            </Modal.Header>
            <Modal.Content>
                {children}
            </Modal.Content>
        </Modal>
    )
}
