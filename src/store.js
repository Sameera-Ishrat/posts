import { configureStore,} from "@reduxjs/toolkit";
import postReducer from "./features/posts/postSlice";
import editReducer from "./features/editSlice/editSlice";

export const store = configureStore({
    reducer : {
posts : postReducer,
postEdit: editReducer
    }
})