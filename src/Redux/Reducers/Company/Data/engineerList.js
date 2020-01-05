const initialState = {
    total_data: 0,
    response: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
  };
  
  const getAllEngineer = (prevState = initialState, action) => {
    // console.log('isigetAllengineer',action.payload.data)
    switch (action.type) {  
      case "GET_ENG_LIST_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "GET_ENG_LIST_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true
        };
      case "GET_ENG_LIST_FULFILLED":
        // console.log('fulfilled',action.payload)
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          total_data: action.payload.data[0][0].total_data,
          response: action.payload.data[1]
        };
      default:
        return prevState;
    }
  };
  
  export default getAllEngineer;
  