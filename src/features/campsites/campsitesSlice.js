import { createSlice } from '@reduxjs/toolkit';
import { CAMPSITES } from './../../app/shared/CAMPSITES';

const initialState = {
    campsitesArray: CAMPSITES // array of the CAMPSITES data
};

const campsitesSlice = createSlice({  // create a slice of data with name campsites.
    name: 'campsites',
    initialState                      // initialState: initialState
});

export const campsitesReducer = campsitesSlice.reducer; // export to be used in Store

// ^^^ needed for the campsitesSlice



export const selectAllCampsites = (state) => {
    return state.campsites.campsitesArray;
}

export const selectCampsiteById = (id) => (state) => {
    return state.campsites.campsitesArray.find(campsite => campsite.id === parseInt(id));
}

export const selectFeaturedCampsite = (state) => {
    return ( state.campsites.campsitesArray.find(campsite => campsite.featured) );
}
 
