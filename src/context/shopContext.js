import React, { Component, createContext } from "react";
import Client from "shopify-buy";

const ShopContext = createContext();

const client = Client.buildClient({
  domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API,
});

class ShopProvider extends Component {
  state = {
    product: {},
    products: [],
    checkout: {},
    isCartOpen: false,
    isMenuOpen: false,
  };

  componentDidMount() {
    const checkoutId = localStorage.checkout_id;
    if (checkoutId) {
      this.fetchCheckout(checkoutId);
    } else {
      this.createCheckout();
    }
  }

  createCheckout = async () => {
    const checkout = await client.checkout.create();
    localStorage.setItem("checkout_id", checkout.id);
    this.setState({ ...this.state, checkout });
  };

  fetchCheckout = async (checkoutId) => {
    const checkout = await client.checkout.fetch(checkoutId);
    this.setState({ checkout });
  };

  addItemToCheckout = async (variantId, quantity) => {
    const lineItemsToAdd = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ];
    const checkout = await client.checkout.addLineItems(this.state.checkout.id, lineItemsToAdd)
    this.setState({checkout})
    this.openCart()
  };

  removeLineItem = async (lineItemIdToRemove) => {
    const checkout = await client.checkout.removeLineItems(this.state.checkout.id, lineItemIdToRemove)
    this.setState({checkout})
  };

  fetchAllProducts = async () => {
    const products = await client.product.fetchAll();
    this.setState({ products });
  };

  fetchProductWithHandle = async (handle) => {
    const product = await client.product.fetchByHandle(handle);
    this.setState({ ...this.state, product });
  };

  closeCart = async () => {
    this.setState({ isCartOpen: false });
  };
  openCart = async () => {
    this.setState({ isCartOpen: true });
  };
  closeMenu = async () => {};
  openMenu = async () => {};

  render() {
    return (
      <ShopContext.Provider
        value={{
          ...this.state,
          fetchAllProducts: this.fetchAllProducts,
          addItemToCheckout: this.addItemToCheckout,
          removeLineItem: this.removeLineItem,
          fetchProductWithHandle: this.fetchProductWithHandle,
          closeCart: this.closeCart,
          openCart: this.openCart,
          closeMenu: this.closeMenu,
          openMenu: this.openMenu,
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };

export default ShopProvider;
