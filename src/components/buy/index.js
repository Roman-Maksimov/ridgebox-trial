import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';
import { cartSetItem, cartRemoveItem } from 'src/actions';

class Buy extends PureComponent {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const quantity = /^\d+$/.test(value) ? Number(value) : this.props.quantity;
    if (quantity !== this.props.quantity && quantity > 0) {
      this.props.onAdd(quantity);
    }
  }

  render() {
    const { isInCart, quantity, className, onAdd, onRemove } = this.props;

    return (
      <div className={`${styles.buy} ${className}`}>
        {isInCart && (
          <div
            className={styles.button}
            onClick={() => this.onChange(quantity - 1)}
          >-</div>
        )}
        {isInCart && (
          <input
            className={styles.input}
            type="number"
            value={quantity}
            min={1}
            onChange={e => this.onChange(e.target.value)}
          />
        )}
        {isInCart && (
          <div
            className={styles.button}
            onClick={() => this.onChange(quantity + 1)}
          >+</div>
        )}
        {isInCart && (
          <i
            className={styles.cart}
            onClick={() => onRemove()}
          >remove_shopping_cart</i>
        )}
        {!isInCart && (
          <i
            className={styles.cart}
            onClick={() => onAdd(quantity)}
          >shopping_cart</i>
        )}
      </div>
    );
  }
}

Buy.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
  }),
  isInCart: PropTypes.bool,
  quantity: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

Buy.defaultProps = {
  className: '',
};

const mapStateToProps = (state, props) => ({
  isInCart: !!state.cart[props.product.id],
  quantity: state.cart[props.product.id] ? state.cart[props.product.id].quantity : 1,
});

const mapDispatchToProps = (dispatch, props) => ({
  onAdd: quantity => dispatch(cartSetItem(props.product, quantity)),
  onRemove: () => dispatch(cartRemoveItem(props.product.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Buy);
