import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import { ADD_MEMBER } from "../actions";

const initialState = {
  data: [],
  isFetchingData: false,
  error: ""
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEMBER: {
      console.log(action.payload);
      if(action.payload.name){

        axiosWithAuth()
      .post('http://localhost:5000/api/friends', action.payload)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error("error  ", err);
      });
  
      return {
        ...state,
        data: [action.payload,...state.data]
      };

     } else return state;

    }
    default:
      return state;
  }
};
