import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useState,
} from "react";
import { reducer } from "./reducer";

const ProductInfoContext = createContext();

export const useSeletedProduct = () => useContext(ProductInfoContext);

export default function ProductInfoProvider({ children }) {
  // this for retrieve data for each time update myprice.
  const [isUpdatedMyPrice, setIsUpdatedMyPrice] = useState(0);

  const [state, dispatch] = useReducer(reducer, {
    // home and corresponding pages
    selectedProduct: {},

    // filter
    storeFilterOptions: [],
    filterByPrice: { min: "", max: "" },
    sortedBy: "Posted: newest first",

    // add to the cart...
    addtoCart: {
      23: {
        product: {
          vanities: [],
          flooring: [],
          tiles: [],
          countertop: [],
          kitchenFaucets: [],
          bathroomFaucets: [],
          cabinets: [],
          countertops: [],
          faucetkitchen: [],
          faucetbathroom: [],
        },
        customLineItem: {
          vanities: [{ id: 1, price: 50 }],
          flooring: [],
          tiles: [],
          countertop: [],
          kitchenFaucets: [],
          bathroomFaucets: [],
          cabinets: [],
          countertops: [],
          faucetkitchen: [],
          faucetbathroom: [],
        },
        customDiscountItem: [{ id: 1, price: 20 }],
        myPrice: {
          vanities: { sign: "%", price: 0 },
          flooring: { sign: "%", price: 0 },
          tiles: { sign: "%", price: 0 },
          countertop: { sign: "%", price: 0 },
          kitchenFaucets: { sign: "%", price: 0 },
          bathroomFaucets: { sign: "%", price: 0 },
          cabinets: { sign: "%", price: 0 },
          countertops: { sign: "%", price: 0 },
          faucetkitchen: { sign: "%", price: 0 },
          faucetbathroom: { sign: "%", price: 0 },
        },
      },
      24: {
        product: {
          vanities: [],
          flooring: [],
          tiles: [],
          countertop: [],
          kitchenFaucets: [],
          bathroomFaucets: [],
          cabinets: [],
          countertops: [],
          faucetkitchen: [],
          faucetbathroom: [],
        },
        customLineItem: {
          vanities: [],
          flooring: [],
          tiles: [],
          countertop: [],
          kitchenFaucets: [],
          bathroomFaucets: [],
          cabinets: [],
          countertops: [],
          faucetkitchen: [],
          faucetbathroom: [],
        },
      },
    },
  });

  const value = useMemo(
    () => ({ ...state, dispatch, isUpdatedMyPrice, setIsUpdatedMyPrice }),
    [state, isUpdatedMyPrice]
  );

  return (
    <ProductInfoContext.Provider value={value}>
      {children}
    </ProductInfoContext.Provider>
  );
}
