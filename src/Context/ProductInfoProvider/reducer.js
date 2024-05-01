import {
  ADD_CABINETS_COLLECTION,
  ADD_DOOR_HANDLES,
  ADD_TO_CART,
  DECREMENT_QANTITY,
  FILTER_BY_LOCATION_VENDOR,
  FILTER_BY_PRICE,
  INCREMENT_QANTITY,
  REMOVE_DOOR_HANDLES,
  REMOVE_TO_CART,
  SELECT_PRODUCT,
  SORTED_BY
} from './actionTypes';

function isAllorNot(name, value, state) {
  if (name === 'All' && value === 'All') return [];
  if (value === 'All') {
    return [...state.storeFilterOptions.filter((option) => Object.keys(option)[0] !== name)];
  }
  return [
    ...state.storeFilterOptions.filter((option) => Object.keys(option)[0] !== name),
    { [name]: value }
  ];
}

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case SELECT_PRODUCT: {
      return {
        ...state,
        selectedProduct: payload
      };
    }

    case FILTER_BY_LOCATION_VENDOR: {
      return {
        ...state,
        filterValue: payload
      };
    }

    case SORTED_BY: {
      return {
        ...state,
        sortedBy: payload
      };
    }

    case FILTER_BY_PRICE: {
      const { name, value } = payload;

      return {
        ...state,
        filterByPrice: {
          ...state.filterByPrice,
          [name]: value
        }
      };
    }

    case 'STORE_FILTER_OPTIONS': {
      const { name, value } = payload;

      return {
        ...state,
        storeFilterOptions: isAllorNot(name, value, state)
      };
    }

    case ADD_TO_CART: {
      return {
        ...state,
        addtoCart: {
          ...state.addtoCart,
          [payload.customerId]: {
            ...state.addtoCart[payload.customerId],
            product: {
              ...state.addtoCart[payload.customerId].product,
              [payload.type]: [
                ...state.addtoCart[payload.customerId].product[payload.type],
                payload
              ]
            }
          }
        }
      };
    }

    case REMOVE_TO_CART: {
      return {
        ...state,
        addtoCart: {
          ...state.addtoCart,
          [payload.customerId]: {
            ...state.addtoCart[payload.customerId],
            product: {
              ...state.addtoCart[payload.customerId].product,
              [payload.type]: state.addtoCart[payload.customerId].product[payload.type].filter(
                (prod) => prod.id !== payload.id
              )
            }
          }
        }
      };
    }

    case 'ADD_LINE_ITEM': {
      return {
        ...state,
        addtoCart: {
          ...state.addtoCart,
          [payload.customerId]: {
            ...state.addtoCart[payload.customerId],
            customLineItem: {
              ...state.addtoCart[payload.customerId].customLineItem,
              [payload.type]: [
                ...state.addtoCart[payload.customerId].customLineItem[payload.type],
                { price: payload.price, id: payload.id }
              ]
            }
          }
        }
      };
    }
    case 'REMOVE_LINE_ITEM': {
      return {
        ...state,
        addtoCart: {
          ...state.addtoCart,
          [payload.customerId]: {
            ...state.addtoCart[payload.customerId],
            customLineItem: {
              ...state.addtoCart[payload.customerId].customLineItem,
              [payload.type]: [
                ...state.addtoCart[payload.customerId].customLineItem[payload.type].filter(
                  (item) => item.id !== payload.id
                )
              ]
            }
          }
        }
      };
    }

    case 'ADD_DISCOUNT_LINE_ITEM': {
      return {
        ...state,
        addtoCart: {
          ...state.addtoCart,
          [payload.customerId]: {
            ...state.addtoCart[payload.customerId],
            customDiscountItem: [
              ...state.addtoCart[payload.customerId].customDiscountItem,
              { id: payload.id, price: payload.price }
            ]
          }
        }
      };
    }

    case 'REMOVE_DISCOUNT_LINE_ITEM': {
      return {
        ...state,
        addtoCart: {
          ...state.addtoCart,
          [payload.customerId]: {
            ...state.addtoCart[payload.customerId],
            customDiscountItem: [
              ...state.addtoCart[payload.customerId].customDiscountItem.filter(
                (item) => item.id !== payload.id
              )
            ]
          }
        }
      };
    }

    // case "SET_MY_PRICE": {
    // 	// updateMyprice(state, { type, payload });
    // 	/* return {
    //         ...state,
    //         addtoCart: {
    //            ...state.addtoCart,
    //            [payload.customerId]: {
    //               ...state.addtoCart[payload.customerId],
    //               myPrice: {
    //                  ...state.addtoCart[payload.customerId].myPrice,
    //                  [payload.type]: { price: payload.price, sign: payload.sign },
    //               },
    //            },
    //         },
    //      }; */
    // }

    case 'SET_MY_PRICE_ADD_TO_CART': {
      return {
        ...state,
        addtoCart: {
          ...state.addtoCart,
          [payload.customerId]: {
            ...state.addtoCart[payload.customerId],
            product: {
              ...state.addtoCart[payload.customerId].product,
              [payload.type]: state.addtoCart[payload.customerId].product[payload.type]?.map(
                (item) => ({
                  ...item,
                  myPrice:
                    payload.sign === '%'
                      ? ((item.price / 100) * payload.price).toFixed(2)
                      : payload.price
                })
              )
            }
          }
        }
      };
    }

    // cabinets door handles collection and qantity;
    case 'ADD_CABINETS_COLLECTION_TO_CART': {
      return {
        ...state,
        addtoCart: {
          ...state.addtoCart,
          [payload[0].customerId]: {
            ...state.addtoCart[payload[0].customerId],
            product: {
              ...state.addtoCart[payload[0].customerId].product,
              [payload[0].type]: [
                ...state.addtoCart[payload[0].customerId].product[payload[0].type],
                ...payload.map((prod) => ({
                  ...prod,
                  totalAmount: prod.myPrice * prod.quantity
                }))
              ]
            }
          }
        }
      };
    }

    case 'REMOVE_CABINETS_COLLECTION_FROM_CART': {
      return {
        ...state,
        addtoCart: {
          ...state.addtoCart,
          [payload.customerId]: {
            ...state.addtoCart[payload.customerId],
            product: {
              ...state.addtoCart[payload.customerId].product,
              [payload.type]: state.addtoCart[payload.customerId].product[payload.type].filter(
                (prod) => !payload.ids.includes(prod.id)
              )
            }
          }
        }
      };
    }

    case 'ADD_HANDLE_TO_CART': {
      return {
        ...state,
        addtoCart: {
          ...state.addtoCart,
          [payload.customerId]: {
            ...state.addtoCart[payload.customerId],
            product: {
              ...state.addtoCart[payload.customerId].product,
              [payload.type]: [
                ...state.addtoCart[payload.customerId].product[payload.type],
                ...payload.data.map((prod) => ({
                  ...prod,
                  totalAmount: prod.price * prod.quantity
                }))
              ]
            }
          }
        }
      };
    }

    case 'REMOVE_SINGLE_HANDLE_TO_CART': {
      const filterProduct = state.addtoCart[payload.customerId].product[payload.type].filter(
        (prod) => !(prod.subType === payload.subType && prod.id === payload.id)
      );

      return {
        ...state,
        addtoCart: {
          ...state.addtoCart,
          [payload.customerId]: {
            ...state.addtoCart[payload.customerId],
            product: {
              ...state.addtoCart[payload.customerId].product,
              [payload.type]: filterProduct
            }
          }
        }
      };
    }

    case 'INCREMENT_HANDLE_QTY_TO_CART': {
      return {
        ...state,
        addtoCart: {
          ...state.addtoCart,
          [payload.customerId]: {
            ...state.addtoCart[payload.customerId],
            product: {
              ...state.addtoCart[payload.customerId].product,
              [payload.type]: state.addtoCart[payload.customerId].product[payload.type].map(
                (prod) => {
                  if (prod.id === payload.id) {
                    return {
                      ...prod,
                      quantity: prod.quantity + 1,
                      totalAmount: prod.price * (prod.quantity + 1)
                    };
                  }
                  return prod;
                }
              )
            }
          }
        }
      };
    }

    case 'REMOVE_HANDLE_TO_CART': {
      return {
        ...state,
        addtoCart: {
          ...state.addtoCart,
          [payload.customerId]: {
            ...state.addtoCart[payload.customerId],
            product: {
              ...state.addtoCart[payload.customerId].product,
              [payload.type]: state.addtoCart[payload.customerId].product[payload.type].filter(
                (prod) => prod.subType !== payload.subType
              )
            }
          }
        }
      };
    }

    case 'DECREMENT_HANDLE_QTY_TO_CART': {
      return {
        ...state,
        addtoCart: {
          ...state.addtoCart,
          [payload.customerId]: {
            ...state.addtoCart[payload.customerId],
            product: {
              ...state.addtoCart[payload.customerId].product,
              [payload.type]: state.addtoCart[payload.customerId].product[payload.type]
                .map((prod) => {
                  if (prod.id === payload.id) {
                    return {
                      ...prod,
                      quantity: prod.quantity - 1,
                      totalAmount: prod.price * (prod.quantity - 1)
                    };
                  }
                  return prod;
                })
                .filter((prod) => prod.quantity > 0)
            }
          }
        }
      };
    }

    case 'INCREMENT_CABINETS_QTY': {
      return {
        ...state,
        addtoCart: {
          ...state.addtoCart,
          [payload.customerId]: {
            ...state.addtoCart[payload.customerId],
            product: {
              ...state.addtoCart[payload.customerId].product,
              [payload.type]: state.addtoCart[payload.customerId].product[payload.type].map(
                (prod) => {
                  if (prod.id === payload.id) {
                    return {
                      ...prod,
                      quantity: prod.quantity + 1,
                      totalAmount: (+prod.myPrice * (prod.quantity + 1)).toFixed(2)
                    };
                  }
                  return prod;
                }
              )
            }
          }
        }
      };
    }

    case 'DECREMENT_CABINETS_QTY': {
      return {
        ...state,
        addtoCart: {
          ...state.addtoCart,
          [payload.customerId]: {
            ...state.addtoCart[payload.customerId],
            product: {
              ...state.addtoCart[payload.customerId].product,
              [payload.type]: state.addtoCart[payload.customerId].product[payload.type]
                .map((prod) => {
                  if (prod.id === payload.id) {
                    return {
                      ...prod,
                      quantity: prod.quantity - 1,
                      totalAmount: (+prod.myPrice * (prod.quantity - 1)).toFixed(2)
                    };
                  }
                  return prod;
                })
                .filter((prod) => prod.quantity > 0)
            }
          }
        }
      };
    }

    case ADD_CABINETS_COLLECTION: {
      return {
        ...state,
        collection: payload
      };
    }

    case INCREMENT_QANTITY: {
      return {
        ...state,
        collection: state.collection.map((item) => {
          if (item.id === payload) return { ...item, quantity: item.quantity + 1 };
          return item;
        })
      };
    }

    case 'INCREMENT_HANDLE_QTY': {
      return {
        ...state,
        handles: state.handles.map((item) => {
          if (item.id === payload) return { ...item, quantity: item.quantity + 1 };
          return item;
        })
      };
    }

    case DECREMENT_QANTITY: {
      return {
        ...state,
        collection: state.collection.map((item) => {
          if (item.quantity === 0) return item;
          if (item.id === payload) return { ...item, quantity: item.quantity - 1 };
          return item;
        })
      };
    }

    case 'DECREMENT_HANDLE_QTY': {
      return {
        ...state,
        handles: state.handles
          .map((item) => {
            if (item.id === payload) return { ...item, quantity: item.quantity - 1 };
            return item;
          })
          .filter((item) => item.quantity !== 0)
      };
    }

    case ADD_DOOR_HANDLES: {
      return {
        ...state,
        handles: [...state.handles, payload]
      };
    }

    case 'UPDATE_HANDLE_STATE': {
      return {
        ...state,
        handles: payload
      };
    }

    case REMOVE_DOOR_HANDLES: {
      return {
        ...state,
        handles: state.handles.filter((item) => item.id !== payload)
      };
    }

    default:
      return state;
  }
};
