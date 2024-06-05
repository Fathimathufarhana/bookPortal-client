import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store"
import axios from "axios";
import { AppThunk } from "../store";

interface Data {
    _id:string
    name: string
    author: string
    star_rating: number
    genre: string
    published: string
    price: number
    language: string
    image: string
}

interface Book {
    bookData : Data[]
}

const initialState : Book = {
    bookData: []
}
// const storedToken = localStorage.getItem("access_token");
// const headers = { Authorization: `Bearer ${storedToken}` };
 

// export const fetchUsers = createAsyncThunk(
//     "books/getAllBooks",
//     async (thunkApi) => {
//       const response = await axios.post("http://localhost:3601/books/create", {headers});
//     }
//   );



  export const bookSlice = createSlice({
        name: "books",
        initialState,
        reducers: {
            addBook: (state, action: PayloadAction<Data>) => {
               state.bookData.push(action.payload)
            },
            listBook: (state, action: PayloadAction<Data[]>) => {
                state.bookData = (action.payload)
            },
            editBook: (state, action: PayloadAction<Data>) => {
                state.bookData.push(action.payload)
            },
            deleteBook: () =>{
                // state.bookData.filter
                // const postId = action.payload;
                // return state.bookData.filter((post: any) => post._id = postId);
            }
        }
    })

    export const fetchAddBook = ( formDataToSend: FormData ):
        AppThunk => async(dispatch) => {
            const storedToken = localStorage.getItem("access_token")!;
            const response = await axios.post("http://localhost:3601/books/create",formDataToSend, {
             headers:{ Authorization: `Bearer ${storedToken}` }
            });
            dispatch(addBook(response.data))
    }

    interface Params {
        q: string
        price: number
        star_rating: number 
    }

    export const fetchBooks = ( params: Params ) :
        AppThunk<Promise<void>> => async( dispatch ) => {

            const storedToken = localStorage.getItem("access_token")!
            const response = await axios.post("http://localhost:3601/books/list", params,
            { headers:{ Authorization: `Bearer ${storedToken}` } }
            );
        //   console.log(response.data.data,"fetchBooks")
            dispatch(listBook(response.data.data))
        }
   
    export const fetchEditBook = ( formDataToSend: FormData ):
    AppThunk<Promise<void>> => async( dispatch ) => {
        const storedToken = localStorage.getItem("access_token")!
        const response = await axios.patch('http://localhost:3601/books/edit' , 
        formDataToSend ,
        { headers:{ Authorization: `Bearer ${storedToken}` } }
        );
        console.log(response.data.data,"editBook")
        dispatch(editBook(response.data.data))
    }

    interface Bookid {
        bookid : string
    }
    export const fetchDeleteBook = ( bookid : Bookid ):
    AppThunk => async( dispatch ) => {
        try {
            const storedToken = localStorage.getItem("access_token")!
            const response = await axios.patch("http://localhost:3601/books/delete",
            bookid,
            { headers:{ Authorization: `Bearer ${storedToken}` } }
    
            )
            // console.log(response.data.message)
            dispatch(deleteBook(response.data.message)) 
        } catch (error:any) {
            // console.log(error.message)
        }
        
    }


export const {addBook, listBook, editBook, deleteBook} = bookSlice.actions;
export default bookSlice.reducer;