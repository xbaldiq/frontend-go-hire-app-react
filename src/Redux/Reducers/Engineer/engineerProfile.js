const initialState = {
    engineerProfile: {},
    isPending: false,
    isRejected: false,
    isFulfilled: false
  };
  
  const getEngineerProfile = (prevState = initialState, action) => {
    switch (action.type) {
      case "GET_ENG_PROFILE_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "GET_ENG_PROFILE_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true
        };
      case "GET_ENG_PROFILE_FULFILLED":
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          engineerProfile: action.payload.data.data
        };
      default:
        return prevState;
    }
  };
  
  export default getEngineerProfile;
  