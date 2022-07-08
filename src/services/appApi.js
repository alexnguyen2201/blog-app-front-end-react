// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/v1",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().user.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        signupUser: builder.mutation({
            query: (user) => ({
                url: "/users",
                method: "POST",
                body: user,
            }),
        }),
        loginUser: builder.mutation({
            query: (user) => ({
                url: "/login/access-token",
                method: "POST",
                body: user,
            }),
        }),

        logoutUser: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST",
            }),
        }),
        getCurrentUser: builder.mutation({
            query: () => ({
                url: "/users/me",
                method: "GET",
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const {
    useSignupUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useGetCurrentUserMutation,
} = appApi;
export default appApi;
