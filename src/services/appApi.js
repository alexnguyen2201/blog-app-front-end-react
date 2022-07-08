// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
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
                url: "/users/login",
                method: "POST",
                body: user,
            }),
        }),

        logoutUser: builder.mutation({
            query: () => ({
                url: "/users/logout",
                method: "DELETE",
            }),
        }),
        //post routers
        createPost: builder.mutation({
            query: (article) => ({
                url: "/posts",
                method: "POST",
                body: article,
            }),
        }),

        getPosts: builder.query({
            query: () => ({
                url: "/posts",
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
    useCreatePostMutation,
    useGetPostsQuery,
} = appApi;

export default appApi;
