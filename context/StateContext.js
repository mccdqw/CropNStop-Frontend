import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext({ isAuthenticated: false });

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    //console.log(product)
    const checkProductInCart = cartItems.find((item) => item.id === product.id);
    //console.log(checkProductInCart)
    
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.attributes.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    
    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })

      setCartItems(updatedCartItems);

    } else {
      product.quantity = quantity;
      
      setCartItems(cartItems => [...cartItems, {
        ...product, 
      }]);
    }
    toast.success(`${qty} ${product.attributes.name} added to the cart.`);
  }

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) =>  item.id === product.id);
    const newCartItems = cartItems.filter((item) => item.id !== product.id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.attributes.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  } 
  
  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) =>  item.id === id);
    index = cartItems.findIndex((product) => product.id === id);

    // need to create another cart items array so we don't directly mutate the state, good react practice to do it this way
    // can't use splice since we are technically still mutating the state with this function
    // const newCartItems = cartItems.splice(index, 1);

    // keep all items except the one we are looking for
    const newCartItems = cartItems.filter((item) => item.id !== id);

    /* 
      the setCartItems function commented out doesn't work perfectly. when 
      removing an item, the item will jump in the cart
      what we want to do is update the foundProduct with the new quantity,
      splice the new cart items array with the found product in the correct spot,
      and setCartItems with the newCartItems array
    */

    if (value === 'inc') {
      //setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
      foundProduct = { ...foundProduct, quantity: foundProduct.quantity + 1};
      newCartItems.splice(index, 0, foundProduct);

      setCartItems([...newCartItems])
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.attributes.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    }
    else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        //setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);

        foundProduct = { ...foundProduct, quantity: foundProduct.quantity - 1};
        newCartItems.splice(index, 0, foundProduct);

        setCartItems([...newCartItems])
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.attributes.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
  }

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        setShowCart,
        toggleCartItemQuanitity,
        onRemove
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);