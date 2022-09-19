class NewsletterForm extends React.Component {
  state = {
    email: '',
    formMessage: '',
    busy: false,
    successMessage: '',
  };

  validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  // event handlers need "this"
  onSubmit = (event) => {
    event.preventDefault();
    const email = this.state.email;

    if (!this.validateEmail(email)) {
      this.setState({
        formMessage: 'Please use a valid email',
      });

      return;
    }

    this.setState({
      busy: true,
      formMessage: '',
    });

    setTimeout(() => {
      this.setState({
        busy: false,
        email: '',
        successMessage: `Emailul ${this.state.email} a fost inscris.`,
      });
    }, 3000);
  };

  // controlled component/input
  onInputChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  // render runs everytime state changes
  render() {
    const isSubmitted = this.state.successMessage.trim().length > 0;

    if (isSubmitted) {
      return <div className="container">{this.state.successMessage}</div>;
    }

    // render must -RETURN- JSX
    return (
      <section class="footer-sign-up-newsletter container">
        <form action="" method="post" className="" onSubmit={this.onSubmit}>
          <label for="email-newsletter">sign up for our newsletter</label>
          <input
            type="email"
            name="email"
            id="email-newsletter"
            placeholder="email@mydomain.com"
            onChange={this.onInputChange}
            value={this.state.email}
          />
          <button title="Subcribe" type="submit" disabled={this.state.busy}>
            SUMBIT
          </button>

          <div className="form-message">{this.state.formMessage}</div>
        </form>
      </section>
    );
  }
}

const newsletterContainer = document.querySelector(
  '.footer-sign-up-newsletter',
);
// React recipe?
ReactDOM.render(<NewsletterForm></NewsletterForm>, newsletterContainer);

class AddToCartButton extends React.Component {
  state = {
    added: false,
    busy: false,
  };

  onClick = () => {
    // NO
    // this.state.added = !this.state.added

    this.setState({
      busy: true,
    });

    setTimeout(() => {
      const eventName = this.state.added
        ? 'cart/productRemoved'
        : 'cart/productAdded';

      dispatchEvent(
        new CustomEvent(eventName, {
          detail: {
            productId: this.props.productId,
          },
        }),
      );

      this.setState({
        added: !this.state.added,
        busy: false,
      });
    }, 2000);
  };

  // all components require a render
  render() {
    // render must return jsx
    return (
      <button
        className={`product-control ${this.state.added ? 'active' : ''}`}
        onClick={this.onClick}
        type="button"
        title={this.state.added === true ? 'Remove from Cart' : 'Add to Cart'}
        disabled={this.state.busy}
      >
        {this.state.added === true
          ? `PID: ${this.props.productId} in cart`
          : 'Add to Cart'}
        {this.state.busy ? <i className="fas fa-spinner"></i> : ''}
      </button>
    );
  }
}

//function react component
const AddToWishlistButton = () => {
  const state = React.useState({
    added: false,
    busy: false,
  });
  const actualState = state[0];
  const setState = state[0];

  const onClick = () => {
    setState({
      added: actualState.added,
      busy: true,
    });

    setTimeout(() => {
      //dispatch event

      setState({
        added: !actualState.added,
        busy: false,
      });
    }, 500);
  };

  return (
    <button
      type="button"
      title={actualState.added ? 'Remove from wishlist' : 'Add to Wishlist'}
      className={`product-control`}
      onClick={onClick}
    ></button>
  );
  {
    actualState.added === true
      ? `PID: ${productId} in wishlist`
      : 'Add to Wishlist';
  }
  {
    actualState.busy ? <i className="fas fa-spinner"></i> : '';
  }
};

class ProductControls extends React.Component {
  render() {
    return [
      <AddToCartButton
        key="cart"
        productId={this.props.productId}
      ></AddToCartButton>,
      <AddToWishlistButton
        key="wl"
        productId={this.props.productid}
      ></AddToWishlistButton>,
    ];
  }
}

const productTileControls = document.querySelectorAll('.product-tile-controls');
productTileControls.forEach((productTileControl, index) => {
  ReactDOM.render(
    <AddToCartButton productId={index}></AddToCartButton>,
    productTileControl,
  );
});

class HeaderCounters extends React.Component {
  state = {
    cartItemsCount: 0,
    cartItems: [],
  };

  componentDidMount() {
    addEventListener('cart/productAdded', (event) => {
      const productId = event.detail.productId;
      //slice will clone the array
      const cartItems = this.state.cartItems.slice();
      cartItems.push(productId);

      this.setState({
        cartItemsCount: cartItems.length,
        cartItems,
      });
    });

    addEventListener('cart/productRemoved', (event) => {
      const productId = event.detail.productId;
      const cartItems = this.state.cartItems.filter((cartItem) => {
        return productId !== cartItem;
      });

      this.setState({
        cartItemsCount: cartItems.length,
        cartItems,
      });
    });
  }

  showProducts = () => {
    let message = '';

    if (this.state.cartItems.length <= 0) {
      message = 'There are no products in your cart';
    } else {
      message = `Those are the pids in yout cart: ${this.state.cartItems}`;
    }

    alert(message);
  };

  render() {
    return (
      <>
        <div className="header-counter" onClick={this.showProducts}>
          <span className="qty">{this.state.cartItemsCount}</span>
          <i className="fas fa-shopping-cart icon"></i>
        </div>

        <div className="header-counter" onClick={this.showProducts}>
          <span className="qty">{this.state.cartItemsCount}</span>
          <i className="fas fa-heart icon"></i>
        </div>
      </>
    );
  }
}

const headerCounters = document.querySelector('.header-counters');
// mount react the good way
ReactDOM.createRoot(headerCounters).render(<HeaderCounters></HeaderCounters>);
