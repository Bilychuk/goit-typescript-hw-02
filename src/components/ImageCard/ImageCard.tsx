import { FC } from 'react';
import { Image } from '../../commonTypes';
import css from './ImageCard.module.css';

interface ImageCard {
  onImageClick: (
    imageUrl: string,
    ariaLabel: string,
    author: string,
    likes: number
  ) => void;
  image: Image;
}

const ImageCard: FC<ImageCard> = ({ onImageClick, image }) => {
  return (
    <div>
      <img
        className={css.img}
        src={image.urls.small}
        alt={image.description}
        onClick={() =>
          onImageClick(
            image.urls.regular,
            image.description,
            image.user.name,
            image.likes
          )
        }
      />
    </div>
  );
};

export default ImageCard;
