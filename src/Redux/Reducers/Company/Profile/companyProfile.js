const initialState = {
    companyProfile: {},
    isPending: false,
    isRejected: false,
    isFulfilled: false
  };
  
  const getCompanyProfile = (prevState = initialState, action) => {
    switch (action.type) {
      case "GET_COM_PROFILE_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "GET_COM_PROFILE_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true
        };
      case "GET_COM_PROFILE_FULFILLED":
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          companyProfile: action.payload.data.data
        };
      default:
        return prevState;
    }
  };
  
  export default getCompanyProfile;
  