import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  removeAllCartVideos: () => {},
  addCartVideo: () => {},
  removeCartVideo: () => {},
  changeTeam: () => {},
})

export default CartContext
