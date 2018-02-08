import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import Header from 'src/components/header';
import Content from './content';
import styles from './styles.scss';

const Product = () => (
  <div className={styles.root}>
    <Header />
    <Link to="/">&larr; Back to the catalog</Link>
    <Content />
  </div>
);

Product.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Product;
