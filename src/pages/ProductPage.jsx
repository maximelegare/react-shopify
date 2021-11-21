import React, { useEffect, useContext } from "react";
import { useParams, Link } from "react-router";

import { ShopContext } from "../context/shopContext";

const ProductPage = () => {
  const { handle } = useParams();

  const { fetchProductWithHandle, product, addItemToCheckout } =
    useContext(ShopContext);

  useEffect(() => {
    fetchProductWithHandle(handle);
  }, [fetchProductWithHandle, handle]);

  if (!product.title) return <div>loading...</div>;

  return (
    <div>
      <h1>{product.title}</h1>
    </div>
  );
};

export default ProductPage;
