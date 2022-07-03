import { createSlice } from '@reduxjs/toolkit';
import { CAMPSITES } from './../../app/shared/CAMPSITES';

const initialState = {
    campsitesArray: CAMPSITES // array of the [CAMPSITES] data
};

const campsitesSlice = createSlice({  // create a slice of data with name 'campsites'.
    name: 'campsites',
    initialState                      // initialState: [initialState]
});

export const campsitesReducer = campsitesSlice.reducer; // export to be used in Store

// ^^^ needed for the [campsitesSlice]



export const selectAllCampsites = (state) => {  // passing in the [state] from the campsiteSlice
    return state.campsites.campsitesArray;      // return the [campsitesArray] which includes [CAMPSITES]
}

export const selectCampsiteById = (id) => (state) => {      //passing in [id] to the function that will use the [state] and be returned to the useSelector that is using this selectCampsiteById as its argument
    return state.campsites.campsitesArray.find(campsite => campsite.id === parseInt(id)); //return from the [campsiteArray] the campsite with the [id] that was passed 
}

export const selectFeaturedCampsite = (state) => {      //passing the [state] from campsiteSlice
    return ( state.campsites.campsitesArray.find(campsite => campsite.featured) ); // return the campsite with the property of [featured] set to [true]
}
 
