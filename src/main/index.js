import React from 'react';
import Header from '../components/header';
import Catalog from './catalog';
import styles from './styles.scss';

const Main = () => (
  <div className={styles.root}>
    <Header />
    <Catalog />
  </div>
);

export default Main;
