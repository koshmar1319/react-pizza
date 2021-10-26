import { strAddPizza, strRemoveCartItem, strPlusCartItem, strMinusCartItem, strClearCart } from '../../constants';

const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

const getTotalSum = (obj, path) => {
  return Object.values(obj).reduce((sum, obj) => {
    const [firstKey, ...keys] = path.split('.');
    const value = keys.reduce((val, key) => {
      return val[key];
    }, obj[firstKey]);
    return sum + value;
  }, 0);
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case strAddPizza: {
      const currentPizzaItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
        },
      };

      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case strRemoveCartItem: {
      const newitems = {
        ...state.items,
      };
      const currentTotalPrice = newitems[action.payload].totalPrice;
      const currentTotalCount = newitems[action.payload].items.length;
      delete newitems[action.payload];
      return {
        ...state,
        items: newitems,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount,
      };
    }

    case strPlusCartItem: {
      const newObjItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];

      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        }
      };

      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      }
    }

    case strMinusCartItem: {
      const oldItems = state.items[action.payload].items;
      const newObjItems = oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems;

      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        }
      };

      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      }
    }

    case strClearCart:
      return {
        totalPrice: 0,
        totalCount: 0,
        items: {},
      }

    default:
      return state;
  }
};

export default cart;
