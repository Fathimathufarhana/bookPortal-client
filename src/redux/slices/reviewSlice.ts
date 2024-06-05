import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import axios from "axios";

interface Data {
    _id: string
    user: string
    book: string
    review: string
    rating: number
}

interface Review {
    reviewData : Data[]
}

const initialState : Review = {
    reviewData: []
}

interface ReviewId {
    _id : string
}

export interface NewReview {
    book_id : string
    review : string
    rating : number
}

interface EditReview {
    _id : string
    user : string | null
    review : string
    rating : number
}

    export const reviewSlice = createSlice({
        name: "reviews",
        initialState,
        reducers: {
            listReview: (state, action: PayloadAction<Data[]>) => {
                state.reviewData = (action.payload)
            },
            addReview: (state, action: PayloadAction<Data>) => {
                state.reviewData.push(action.payload)
            },
             editReview: (state, action: PayloadAction<Data>) => {
                state.reviewData.push(action.payload)
            }
        }
    })

    export const fetchReviews = ( _id : ReviewId ) :
    AppThunk => async ( dispatch ) => {
    try {
        const storedToken = localStorage.getItem("access_token")!

        const response = await axios.post(`http://localhost:3601/review/view`, _id,
        { headers:{ Authorization: `Bearer ${storedToken}` } }
        );
    //   console.log(response.data.data,"fetchReview")
        dispatch(listReview(response.data.data))   
    } catch (error:any) {
        console.log(error.message)
    } 
}

    export const fetchAddReview = ( data: NewReview) :
    AppThunk<Promise<void>> => async ( dispatch ) => {
        const storedToken = localStorage.getItem("access_token")!

        const response = await axios.post('http://localhost:3601/review/add', data,
        { headers:{ Authorization: `Bearer ${storedToken}` } }
        );
        // console.log(response.data.data,"newReview")
        dispatch(addReview(response.data.data))  
    }

    export const fetchEditReview = ( data : EditReview ):
    AppThunk<Promise<void>> => async( dispatch ) => {
        const storedToken = localStorage.getItem("access_token")!
        const response = await axios.patch('http://localhost:3601/review/edit' , 
        data ,
        { headers:{ Authorization: `Bearer ${storedToken}` } }
        );
        dispatch(editReview(response.data.data))
    }

export const { listReview, addReview, editReview } = reviewSlice.actions;
export default reviewSlice.reducer;