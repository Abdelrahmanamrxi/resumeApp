import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authReducer";
import authService from "./slices/authServiceReducer";

const store = configureStore({
    reducer: {
        [authService.reducerPath]: authService.reducer,
        authState: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authService.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;