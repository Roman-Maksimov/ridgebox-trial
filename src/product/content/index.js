import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { productsSetItem, productsGetItem } from 'src/actions';
import Buy from 'src/components/buy';
import styles from './styles.scss';

class Content extends PureComponent {
  componentWillMount() {
    const { id, product, catalog, onSetProduct, onGetProduct } = this.props;

    if (!product) {
      const prod = catalog.filter(item => item.id === id)[0];

      if (prod) {
        // take the product from the catalog
        onSetProduct(prod);
      } else {
        // request product's details if they are not in the catalog
        onGetProduct(id);
      }
    }
  }

  render() {
    const { product } = this.props;

    return product ? (
      <div className={styles.product}>
        <div className={styles.img}>
          <img src={product.img} alt={product.name} />
        </div>
        <div className={styles.details}>
          <h1 className={styles.title}>{product.title}</h1>
          <div className={styles.bottom}>
            <Buy product={product} className={styles.buy} />
            <div className={styles.price}>${product.price.toFixed(2)}</div>
          </div>
        </div>
      </div>
    ) : <span>Loading...</span>;
  }
}

const typeProduct = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
});

Content.propTypes = {
  id: PropTypes.number.isRequired,
  product: typeProduct,
  catalog: PropTypes.arrayOf(typeProduct).isRequired,
};

const mapStateToProps = state => ({
  product: state.products.product,
  catalog: state.products.catalog,
});

const mapDispatchToProps = (dispatch, props) => ({
  onSetProduct: item => dispatch(productsSetItem(item)),
  onGetProduct: () => dispatch(productsGetItem(props.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
