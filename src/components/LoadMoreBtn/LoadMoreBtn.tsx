import { FC } from 'react';
import css from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <div className={css.loadMoreContainer}>
      <button className={css.loadMoreBtn} onClick={onClick}>
        Load more images
      </button>
    </div>
  );
};
export default LoadMoreBtn;
