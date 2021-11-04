export const initialState={
    basket:[],
    user:null,
    like:[]
}
//selector
export const getBasketTotal = (basket) => 
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer=(state,action)=>{
    console.log(action)
    switch(action.type) {
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket:[...state.basket,action.item]
            };
        case "EMPTY_BASKET":
            return{
                ...state,
                basket:[]
            }
        case "ADD_LIKE":
            return{
                ...state,
                like:[...state.like,action.like]
            } 
        case "REMOVE_FROM_BASKET":
                const index=state.basket.findIndex(
                    (basketItem)=>basketItem.id===action.id//here generally what it do is it find
                    //index and return it to you
                );
                let newBasket=[...state.basket]//here it copy that basket return here into new variable
                if(index>=0){
                    newBasket.splice(index,1)//what it do is it splice that item with that index by one,like remove by one
                }else{
                    console.warn(
                        `Cant remove product (id: ${action.id}) as its not in basket`
                    )
                }
                return{
                    ...state,
                    basket:newBasket
                }
        
        case "SET_USER":
            return{
                ...state,
                user:action.user
            }
            default:
                return state;
    }
}

export default reducer;