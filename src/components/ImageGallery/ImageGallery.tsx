import { FC } from 'react';
import { Image } from '../../commonTypes';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (
    imageUrl: string,
    ariaLabel: string,
    author: string,
    likes: number
  ) => void;
}

const ImageGallery: FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  return (
    <ul className={css.list}>
      {images.map(image => (
        <li key={image.id} className={css.item}>
          <ImageCard image={image} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
