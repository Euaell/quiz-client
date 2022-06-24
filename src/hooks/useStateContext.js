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

const getService = () => {
    if (localStorage.getItem("service") === null) {
        localStorage.setItem("service", JSON.stringify(
            {
                serviceId: null,
                name: "",
                price: 0,
                description: ""
            }
        ))
    }
    return JSON.parse(localStorage.getItem("service"));
}

// localStorage.setItem('key', obj)
// localStorage.getItem('key')
// localStorage.removeItem('key')

export default function useStateContext() {
    const {context, setContext} = useContext(stateContext);
    const {item, setItem} = useContext(stateContext);
    const {order, setOrder} = useContext(stateContext);
    const {service, setService} = useContext(stateContext);
    
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
        },
        service,
        setService: obj => {
            setService({...service, ...obj})
        },
        resetService: () => {
            localStorage.removeItem("service");
            setService(getService())
        }
    }
}

export function ContextProvider({children}) {
    const [context, setContext] = useState(getFreshContext());
    const [item, setItem] = useState(getItem());
    const [order, setOrder] = useState(getOrder());
    const [service, setService] = useState(getService());
    
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(context));
    }, [context]);
    useEffect(() => {
        localStorage.setItem("item", JSON.stringify(item));
    }, [item]);
    useEffect(() => {
        localStorage.setItem("order", JSON.stringify(order));
    }, [order]);
    useEffect(() => {
        localStorage.setItem("service", JSON.stringify(service));
    }, [service]);
    
    return (
        <stateContext.Provider value={{context, setContext, item, setItem, order, setOrder, service, setService }}>
            {children}
        </stateContext.Provider>
  )
}
