import { strAddPizza, strRemoveCartItem, strPlusCartItem, strMinusCartItem, strClearCart } from '../../constants';

const addPizzaToCart = (pizzaObj) => ({
  type: strAddPizza,
  payload: pizzaObj,
});

const removeCartItem = (id) => ({
  type: strRemoveCartItem,
  payload: id,
});

const plusCartItem = (id) => ({
  type: strPlusCartItem,
  payload: id,
});

const minusCartItem = (id) => ({
  type: strMinusCartItem,
  payload: id,
});

const clearCart = () => ({
  type: strClearCart,
});

export { addPizzaToCart, clearCart, removeCartItem, plusCartItem, minusCartItem };
