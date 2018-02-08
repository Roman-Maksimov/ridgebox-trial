import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { productsSetItem, productsGetItem } from 'src/actions';
import styles from './styles.scss';

class Content extends PureComponent {
  render() {
    const { products } = this.props;
    const isEmpty = products.length < 1;
    const quantity = products.reduce((prev, curr) => prev + curr.quantity, 0);
    const price = products.reduce((prev, curr) => prev + curr.quantity * curr.price, 0);

    return (
      <table className={styles.basket} cellSpacing={0}>
        <thead>
        <tr>
          <th colSpan={2}>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total Price</th>
        </tr>
        </thead>
        <tbody>
        {isEmpty ? (
          <tr key="empty">
            <td colSpan={5} className={styles.empty}>
              You don't have any products in the cart
            </td>
          </tr>
        ) : products.map(product => (
          <tr key={product.id}>
            <td className={styles.img}><img src={product.img} alt={product.name} /></td>
            <td className={styles.title}>
              <Link to={`/${product.id}`}>{product.title}</Link>
            </td>
            <td>{product.price.toFixed(2)}</td>
            <td>{product.quantity}</td>
            <td>{(product.price * product.quantity).toFixed(2)}</td>
          </tr>
        ))}
        </tbody>
        <tfoot>
        <tr>
          <td colSpan={3}>Total</td>
          <td>{quantity}</td>
          <td>{price.toFixed(2)}</td>
        </tr>
        </tfoot>
      </table>
    );
  }
}

Content.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = state => ({
  products: Object.values(state.cart),
});

const mapDispatchToProps = (dispatch, props) => ({
  onSetProduct: item => dispatch(productsSetItem(item)),
  onGetProduct: () => dispatch(productsGetItem(props.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
