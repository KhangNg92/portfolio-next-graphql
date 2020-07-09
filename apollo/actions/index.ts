import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import {
  GET_PORTFOLIOS,
  UPDATE_PORTFOLIO,
  CREATE_PORTFOLIO,
  DELETE_PORTFO,
  SIGN_IN,
  GET_USER,
  SIGN_OUT,
  GET_USER_PORTFOLIOS,
  GET_PORTFOLIO
} from "apollo/queries";

// Delete Portfo
export const deletePortfoAction = () =>
  useMutation(DELETE_PORTFO, {
    update(cache, { data: { deletePortfolio } }) {
      const { userPortfolios } = cache.readQuery({
        query: GET_USER_PORTFOLIOS
      });
      cache.writeQuery({
        query: GET_USER_PORTFOLIOS,
        data: {
          userPortfolios: [
            ...userPortfolios.filter(({ _id }) => _id !== deletePortfolio)
          ]
        }
      });
    },
    onError() {
      return;
    }
  });

export const useGetPortfolios = () => useQuery(GET_PORTFOLIOS);

// Update Portfo
export const updatePortfoAction = (router, id) =>
  useMutation(UPDATE_PORTFOLIO, {
    // update(cache, { data: { updatePortfolio } }) {
    //   const { userPortfolios } = cache.readQuery({
    //     query: GET_USER_PORTFOLIOS
    //   });
    //   const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });

    //   const foundPortfo = userPortfolios.findIndex(({ _id }) => _id === id);
    //   const foundPortfoAll = portfolios.findIndex(({ _id }) => _id === id);

    //   userPortfolios.splice(userPortfolios[foundPortfo], 1, updatePortfolio);
    //   portfolios.splice(portfolios[foundPortfoAll], 1, updatePortfolio);

    //   cache.writeQuery({
    //     query: GET_USER_PORTFOLIOS,
    //     data: { userPortfolios: [...userPortfolios] }
    //   });

    //   cache.writeQuery({
    //     query: GET_PORTFOLIOS,
    //     data: { portfolios: [...portfolios] }
    //   });
    // },
    onError() {
      return;
    }
  });

// Create Portfo
export const createPortfoAction = router =>
  useMutation(CREATE_PORTFOLIO, {
    update(cache, { data: { createPortfolio } }) {
      const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
      cache.writeQuery({
        query: GET_PORTFOLIOS,
        data: { portfolios: [...portfolios, createPortfolio] }
      });
    },
    onError() {
      return;
    },
    onCompleted() {
      return router.push("/portfolios");
    }
  });

export const getUserPortfolios = () => useQuery(GET_USER_PORTFOLIOS);
export const getUserPortfolio = options => useQuery(GET_PORTFOLIO, options);

// Auth action ===================

export const userSignIn = router =>
  useMutation(SIGN_IN, {
    update(cache, { data: { signIn } }) {
      cache.writeQuery({
        query: GET_USER,
        data: { user: signIn }
      });
    },
    onCompleted() {
      return router.push("/");
    },
    onError() {
      return;
    }
  });

export const useSignOut = () => useMutation(SIGN_OUT);
export const useLazyGetUser = () => useLazyQuery(GET_USER);
export const useGetUser = () => useQuery(GET_USER);

// Auth action ===================
