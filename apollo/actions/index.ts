import { useMutation } from "@apollo/react-hooks";
import {
  GET_PORTFOLIOS,
  UPDATE_PORTFOLIO,
  CREATE_PORTFOLIO,
  DELETE_PORTFO
} from "apollo/queries";

// Delete Portfo
export const deletePortfoAction = () =>
  useMutation(DELETE_PORTFO, {
    update(cache, { data: { deletePortfolio } }) {
      const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
      cache.writeQuery({
        query: GET_PORTFOLIOS,
        data: {
          portfolios: [
            ...portfolios.filter(({ _id }) => _id !== deletePortfolio)
          ]
        }
      });
    }
  });

// Update Portfo
export const updatePortfoAction = () => useMutation(UPDATE_PORTFOLIO);

// Create Portfo
export const createPortfoAction = () =>
  useMutation(CREATE_PORTFOLIO, {
    update(cache, { data: { createPortfolio } }) {
      const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
      cache.writeQuery({
        query: GET_PORTFOLIOS,
        data: { portfolios: [...portfolios, createPortfolio] }
      });
    }
  });
