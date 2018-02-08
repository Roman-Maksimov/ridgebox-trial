import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { prodcutsGetList } from 'src/actions';
import Buy from 'src/components/buy';
import styles from './styles.scss';

class Catalog extends PureComponent {
  componentWillMount() {
    this.props.getCatalog();
  }

  render() {
    const { products } = this.props;

    return (
      <div className={styles.catalog}>
        {products.map(item => (
          <div key={item.id} className={styles.item}>
            <Link className={styles.img} to={`/${item.id}`}>
              <img src={item.img} alt={item.title} />
            </Link>
            <Link className={styles.title} to={`/${item.id}`}>{item.title}</Link>
            <div className={styles.bottom}>
              <Buy product={item} className={styles.buy} />
              <div className={styles.price}>${item.price.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

Catalog.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
  })).isRequired,
};

Catalog.defaultProps = {
  products: [],
};

const mapStateToProps = state => ({
  products: state.products.catalog,
});

const mapDispatchToProps = dispatch => ({
  getCatalog: () => dispatch(prodcutsGetList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
