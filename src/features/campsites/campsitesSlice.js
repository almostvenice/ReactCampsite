import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { CAMPSITES } from './../../app/shared/CAMPSITES';
import { baseUrl } from '../../app/shared/baseUrl';
import { mapImageURL } from './../../utils/mapImageURL';

export const fetchCampsites = createAsyncThunk(
    'campsites/fetchCampsites',
    async () => {
        const response = await fetch(baseUrl + 'campsites');
        if (!response.ok) {
            return Promise.reject('Unable to fetch, status: ' + response.status);
        }
        const data = await response.json();
        return data;
    }
)

const initialState = {
    campsitesArray: [], // array of the [CAMPSITES] data
    isLoading: true,
    errMsg: ''

};

const campsitesSlice = createSlice({  // create a slice of data with name 'campsites'.
    name: 'campsites',
    initialState,                      // initialState: [initialState]
    reducers: {},
    extraReducers: {
        [fetchCampsites.pending]: state => {
            state.isLoading = true;
        },
        [fetchCampsites.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.campsitesArray = mapImageURL(action.payload);
        },
        [fetchCampsites.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch Failed';
        }
    }
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
 
