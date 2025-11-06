import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    // lazy query for Home button
    getProducts: builder.query<Product[], void>({
      query: () => 'products',
      providesTags: (result) =>
        result ? result.map((p) => ({ type: 'Products' as const, id: p.id })) : [],
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products' as const, id }],
    }),
  }),
});

export const { useLazyGetProductsQuery, useGetProductByIdQuery } = productsApi;
