import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const StoreContext = createContext(null) //ye context h isse sb suscribe krenge aur use krenge

const StoreContextProvider = (props) => { //iski wajah se sbko context mil rha h iske andr sb wrap krdenge

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000"
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([])

    // in destructuring it is like we copy all the values and then for that particular dish if it was not in cart for first click we 
    // make its value as 1 on more than 1 clicks we increase its value by 1 on adding and decrease by 1 on removing. 
    // we keep an object which has key value pair key is dish and value is value in cart 
    // we use this as the context in the FoodItems.jsx for each dish and this is how we eliminated useState for each dish

    // functionality for add to cart
    const addToCart = async (itemId) => {
        if(!cartItems[itemId]){
            // if the item was not in cart so on first click we make its value as 1
            setCartItems((prev) => ({...prev,[itemId]:1}))
        }
        else{
            // if it was already in cart with value >0 so we just increased the prev value by 1
            setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){ //mtlb logged in h ham
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount = () => {
        let totalCartAmount = 0;
        for(const item in cartItems){ //forin because cartitem is an object
            if(cartItems[item] > 0){    //agr quantity 0 se jyada h us dish ki to hi uska price nikalenge na
                let itemInfo = food_list.find((product) => (product._id === item)); //isse match krte hi poora us dish ka object aa ja rha h iteminfo m
                totalCartAmount += itemInfo.price*cartItems[item] //we get the value of the key mtlb quantity of dish
            }
        }
        return totalCartAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list")
        // when we hit this API we get all food items
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData)
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList(); //pehle food list render hogyi irrespective of login and fir token set hogya if log in h to user
            //aur agr login h to uski otem ya cart value kehlo wo retain hogyi
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData(); 
    },[])

    // we did this for testing
    // useEffect(() => {
    //     console.log(cartItems);
    // },[cartItems])

    const contextValue = { //iska context sbko mil rha h
        food_list, 
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children} {/*iska mtlb h ki jo bhi storecontext k andr wrap hoga usko context ka access mil jayega*/}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;