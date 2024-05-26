import { useEffect, useState } from 'react';
import { fetchImages } from '../../images-api';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageModal from '../ImageModal/ImageModal';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './App.module.css';
import { Image } from '../../commonTypes';

export default function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');
  const [selectedAriaLabel, setSelectedAriaLabel] = useState<string>('');
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [selectedAuthor, setSelectedAuthor] = useState<string>('');
  const [likes, setLikes] = useState<number>(0);

  const handleSubmit = (newImage: string): void => {
    setQuery(newImage);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = (): void => {
    setPage(page + 1);
  };

  const handleImageClick = (
    imageUrl: string,
    ariaLabel: string,
    author: string,
    likes: number
  ): void => {
    setSelectedImageUrl(imageUrl);
    setSelectedAriaLabel(ariaLabel);
    setSelectedAuthor(author);
    setLikes(likes);
    setIsImageModalOpen(true);
  };

  const closeModal = (): void => {
    setIsImageModalOpen(false);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    async function getImages() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchImages(query, page);

        setImages(prevImages => {
          return [...prevImages, ...data.results];
        });

        if (data.total_pages === 0) {
          toast.error('Sorry, we did not find the images.', {
            duration: 6000,
            position: 'bottom-right',
          });
        } else if (data.total_pages === 1) {
          toast.success(`We found ${data.results.length} images!`, {
            duration: 4000,
            position: 'bottom-right',
          });
        }
        setShowBtn(Boolean(data.total_pages && data.total_pages !== page));
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getImages();
  }, [query, page]);

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSubmit} />
      {error && <ErrorMessage />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {isLoading && <Loader />}
      {showBtn && images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal
        isOpen={isImageModalOpen}
        onRequestClose={closeModal}
        imageUrl={selectedImageUrl}
        ariaLabel={selectedAriaLabel}
        author={selectedAuthor}
        likes={likes}
      />
      <Toaster
        toastOptions={{
          style: {
            color: 'white',
          },
          success: {
            style: {
              background: 'green',
            },
          },
          error: {
            style: {
              background: 'red',
            },
          },
        }}
      />
    </div>
  );
}
