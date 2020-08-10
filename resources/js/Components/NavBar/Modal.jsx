import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import "!style-loader!css-loader!bootstrap/dist/css/bootstrap.css";


const ModalDisplay = ({ title, content, show = false, toggle}) => {

    return (
        <Modal id="modal" isOpen={show} toggle={toggle}>
            <ModalHeader toggle={toggle}>{title}</ModalHeader>

            <ModalBody> {content} </ModalBody>

            <ModalFooter>
                <Button color="primary" onClick={toggle}>
        	      تمام
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ModalDisplay;