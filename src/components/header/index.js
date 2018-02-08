import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import User from 'src/components/user';
import styles from './styles.scss';

const Header = ({ quantity, price }) => (
  <div className={styles.header}>
    <User className={styles.user} />
    <div className={styles.cart}>
      <Link to="/basket" className={styles.icon}>shopping_cart</Link>
      <div className={styles.quantity}>{quantity}</div>
      <div className={styles.price}>${price.toFixed(2)}</div>
    </div>
  </div>
);

Header.propTypes = {
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};

const mapStateToPtops = state => ({
  quantity: Object.keys(state.cart)
    .reduce((prev, curr) => prev + state.cart[curr].quantity, 0),
  price: Object.keys(state.cart)
    .reduce((prev, curr) => prev + state.cart[curr].price * state.cart[curr].quantity, 0),
});

export default connect(mapStateToPtops)(Header);
