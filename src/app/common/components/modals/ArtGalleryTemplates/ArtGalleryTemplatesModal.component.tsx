import React from 'react';
import { observer } from 'mobx-react-lite';
import CancelBtn from '@assets/images/utils/Cancel_btn.svg';
import ModalBg from '@assets/images/utils/ModalBg.webp';
import { Modal } from 'antd';
import useMobx, { useModalContext } from '@stores/root-store';
import './ArtGalleryTemplatesModal.scss';
import template1 from '@assets/images/ArtImages/template1.jpg';
import template2 from '@assets/images/ArtImages/template2.png';

const ArtGalleryTemplatesModal = ({ isOpen, onClose }) => {
    const { relatedFiguresStore } = useMobx();
    const { modalStore } = useModalContext();

    return (
        <Modal
            visible={isOpen}
            className="ArtGalleryModal"
            maskClosable
            centered
            footer={null}
            closeIcon={<CancelBtn />}
            onCancel={onClose}
        >
            <div
                className="ArtGalleryImgContainer"
                style={{ background: `url(${ModalBg})` }}
            >
                <img src={template1} alt="Шаблон 1" style={{ position: 'absolute', top: '150px', left: '10px', width: '300px' }} />
                <img src={template2} alt="Шаблон 2" style={{ position: 'absolute', top: '150px', left: '400px', width: '300px' }} />
                <h1>Шаблони</h1>
            </div>
        </Modal>
    );
};

export default observer(ArtGalleryTemplatesModal);
