import React, { useState } from 'react'
import { API_URL, fromImagetoUrl} from '../../utils/urls'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { Product } from '../../components'
import { useStateContext } from '../../context/StateContext'

const ProductDetails = ({ product, products }) => {
  const currentProduct = product[0]
  //console.log(currentProduct)
  const [index, setIndex] = useState(0)
  const { decQty, incQty, qty, onAdd } = useStateContext()
  //console.log(index)

  // const setIndex = (item) => {
  //   index = currentProduct.attributes.image.data.indexOf(item);
  // }

  // const getIndex = () => {
  //   return index;
  // }
  //console.log(currentProduct)
  //console.log(index)

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={fromImagetoUrl(currentProduct.attributes.image.data[index].attributes)}
            className="product-detail-image"
            width={450}
            height={450} />
          </div>
          <div className="small-images-container">
            {currentProduct.attributes.image?.data.map((item, i) => (
              // console.log(item, i)
              <img
              key={i} 
              src={fromImagetoUrl(item.attributes)}
              onMouseEnter={() => setIndex(i)}
              className={i === index ? 'small-image selected-image' : 'small-image'}
            />
            ))}
          </div>
        </div>

          <div className="product-detail-desc">
            <h1>{currentProduct.attributes.name}</h1>
          <h4>Details:</h4>
          <p>{currentProduct.attributes.content}</p>
          <p className="price">${currentProduct.attributes.price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num" onClick="">
                {qty}
              </span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(currentProduct, qty)}>
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick="">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.data.map((item) => (
              <Product key={item.id}
              product={item.attributes}/>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export const getStaticProps = async ( { params: { slug }}) => {
  // fetch the products
  const product_response = await fetch(`${API_URL}/api/products/?populate=%2A`)
  const products_response = await fetch(`${API_URL}/api/products?populate=%2A`)

  const found = await product_response.json()
  //const found = JSON.stringify(product_response)
  const products = await products_response.json()
  const productsArray = found.data;
  let getProduct = productsArray.filter(function (e) {
    return e.attributes.slug === slug
  });

  return {
    props: { product: getProduct, products }
  }
}

export async function getStaticPaths() {
    // get external data from file system, API, DB, etc.
    const products_res = await fetch(`${API_URL}/api/products/?populate=%2A`)
    const products = await products_res.json()

    return {
      paths: products.data.map((product) => ({
        params: {
          slug: product.attributes.slug,
        },
      })),
      fallback: false,
    };
}

export default ProductDetails