import { createContext, useContext, useMemo, useReducer } from 'react';
import { serviceCostApi } from './API/serviceCostApi';
import reducer from './reducer';

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

export default function GlobalStateProvider({ children }) {
   const [state, dispatch] = useReducer(reducer, {
      tilesGobalState: {
         answer: {
            deliver: 'Square Foot',
            install: 'Free',
            remove: 'Free',
            dispose: 'Free',
            underlayment: 'Free',
         },
         input: {
            deliver: '',
            install: '',
            remove: '',
            dispose: '',
            underlayment: '',
         },
         incrementBoxes: {
            deliver: [],
            install: [],
            remove: [],
            dispose: [],
            underlayment: [],
         },
      },
   });

   // add all services
   const [serviceCost, dispatchServiceCost] = useReducer(reducer, serviceCostApi);

   const value = useMemo(() => ({ ...state, dispatch, dispatchServiceCost, serviceCost }), [serviceCost, state]);

   return <GlobalStateContext.Provider value={value}>{children}</GlobalStateContext.Provider>;
}
