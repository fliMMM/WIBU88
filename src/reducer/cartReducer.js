
export const cartReducer = (state, action) =>{
  const {payload:{data}} =  action;
  console.log(data);
  switch(action.type){
    case "ADD":
      return{
        ...state,
        productList: [...state.productList,{...data,amount: 1}]
      };
    default:
      return state;
  }
}