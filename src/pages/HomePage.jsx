import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/shopContext";

import { Link } from "react-router-dom";

const HomePage = () => {
  const { fetchAllProducts, products } = useContext(ShopContext);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  if (!products) return <div>loading...</div>;

  return (
    <div>
      {products.map((product) => (
        <Link to={`/products/${product.handle}`} key={product.title}>{product.title}</Link>
      ))}
    </div>
  );
};

export default HomePage;
