import Modal from 'react-modal';
import css from './ImageModal.module.css';
import { FC } from 'react';

interface Styles {
  content: {
    width: string;
    margin: string;
    color: string;
    border: string;
    padding: string;
  };
  overlay: {
    backgroundColor: string;
  };
}

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  imageUrl: string;
  ariaLabel: string;
  author: string;
  likes: number;
}

const customStyles: Styles = {
  content: {
    width: 'fit-content',
    margin: '0 auto',
    color: 'black',
    border: 'none',
    padding: '0px',
  },
  overlay: {
    backgroundColor: 'rgba(60, 60, 60, 0.9)',
  },
};

Modal.setAppElement('#root');

const ImageModal: FC<ImageModalProps> = ({
  isOpen,
  onRequestClose,
  imageUrl,
  ariaLabel,
  author,
  likes,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modal}
      style={customStyles}
      overlayClassName={css.overlay}
      contentLabel={ariaLabel}
    >
      <img src={imageUrl} alt="Large Image" className={css.image} />
      <div className={css.container}>
        <p className={css.ariaLabel}>{ariaLabel}</p>
        <p className={css.author}>Author: {author}</p>
        <p className={css.likes}>Total likes: {likes}</p>
      </div>
    </Modal>
  );
};

export default ImageModal;
