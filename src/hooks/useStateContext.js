import React, { createContext, useState, useContext, useEffect } from 'react'

export const stateContext = createContext();

const getFreshContext = () => {
    if (localStorage.getItem("user") === null) {
        localStorage.setItem("user", JSON.stringify(
            {
                userId: null,
                name: "",
                email: "",
                phone: "",
                IsAdmin: false
            }
        ))
    }
    
    return JSON.parse(localStorage.getItem("user"));
}

const getItem = () => {
    if (localStorage.getItem("item") === null) {
        localStorage.setItem("item", JSON.stringify(
            {
                itemId: null,
                name: "",
                price: 0,
                description: ""
            }
        ))
    }
    return JSON.parse(localStorage.getItem("item"));
}

const getOrder = () => {
    if (localStorage.getItem("order") === null) {
        localStorage.setItem("order", JSON.stringify(
            {
                userId: null,
                itemId: null,
                quantity: 0,
                address: "",
                city: "",
                country: "",
                orderDate: "",
                totalPrice: 0
            }
        ))
    }
    return JSON.parse(localStorage.getItem("order"));
}

// localStorage.setItem('key', obj)
// localStorage.getItem('key')
// localStorage.removeItem('key')

export default function useStateContext() {
    const {context, setContext} = useContext(stateContext);
    const {item, setItem} = useContext(stateContext);
    const {order, setOrder} = useContext(stateContext);
    
    return { 
        context, 
        setContext: obj => {
            setContext({...context, ...obj})
        },
        resetContext: () => {
            localStorage.removeItem("user");
            setContext(getFreshContext())
        },
        item,
        setItem: obj => {
            setItem({...item, ...obj})
        },
        resetItem: () => {
            localStorage.removeItem("item");
            setItem(getItem())
        },
        order,
        setOrder: obj => {
            setOrder({...order, ...obj})
        },
        resetOrder: () => {
            localStorage.removeItem("order");
            setOrder(getOrder())
        }
    }
}

export function ContextProvider({children}) {
    const [context, setContext] = useState(getFreshContext());
    const [item, setItem] = useState(getItem());
    const [order, setOrder] = useState(getOrder());
    
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(context));
        localStorage.setItem("item", JSON.stringify(item));
        localStorage.setItem("order", JSON.stringify(order));
    }, [context, item, order]);

    return (
        <stateContext.Provider value={{context, setContext, item, setItem, order, setOrder}}>
            {children}
        </stateContext.Provider>
  )
}
