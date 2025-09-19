import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authReducer";
import authService from "./slices/authServiceReducer";
import resumeReducer from "./slices/resumeReducer";

const store = configureStore({
    reducer: {
        [authService.reducerPath]: authService.reducer,
        resumeState:resumeReducer,
        authState: authReducer,
        
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authService.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;