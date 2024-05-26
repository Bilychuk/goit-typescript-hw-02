import { Formik, Form, Field } from 'formik';
import { IoIosSearch } from 'react-icons/io';
import { toast } from 'react-hot-toast';
import css from './SearchBar.module.css';
import { FC } from 'react';

interface SearchBarProps {
  onSubmit: (newImage: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSubmit }) => {
  return (
    <header className={css.wrapper}>
      <Formik
        initialValues={{ query: '' }}
        onSubmit={(values, actions) => {
          if (values.query.trim() === '') {
            toast.error('Please enter a search query!', {
              position: 'bottom-right',
            });
            return;
          } else {
            onSubmit(values.query.trim());
          }
          actions.resetForm();
        }}
      >
        <Form className={css.form}>
          <Field
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={css.button} type="submit">
            <IoIosSearch />
          </button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
