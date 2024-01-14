import { useState, useEffect } from "react";

const useOrders = () => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const [orders, setOrders] = useState(storedOrders);

    const addOrder = (item) => {
        const existingOrders = orders.find((order) => order.id === item.id)
        if (existingOrders) {
            console.log('Товар уже добавлен')
        } else {
            setOrders((prevOrders) => [...prevOrders, item]);
        }
    };
    const removeOrder = (item) => {
        setOrders((prevOrders) => prevOrders.filter(order => order.id !== item.id));
    };
    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders, addOrder, removeOrder]);
    return { orders, addOrder, removeOrder };
};

export default useOrders;