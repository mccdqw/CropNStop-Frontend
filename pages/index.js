import React from 'react';
import { Product, FooterBanner, HeroBanner } from '../components';
import { API_URL } from '../utils/urls';

const Home = ({ products }) => {
  return (
    <>
      <HeroBanner heroBanner={products.data[1]} />

      <div className="products-heading">
        {/* <div>{products.data[0].attributes.image}</div> */}
        <h2>Best Selling Products</h2>
        <p>Crops unlike anything you've ever seen</p>

        <div className="products-container">
          {products.data.map(
            (product) => <Product key={product.id} product={product.attributes}/>
          )}
        </div>
      </div>

      <FooterBanner footerBanner={products.data[4]}/>
    </>
  )
}

export default Home;

export const getServerSideProps = async () => {
  // fetch the products
  const product_response = await fetch(`${API_URL}/api/products/?populate=%2A`)
  const products = await product_response.json()

  // return the products as props
  // return an object with key = props and value = products (ecma script shorthand)
  return {
    props: { products }
  }
}
