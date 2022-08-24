import React from 'react'
import { AxiosProductInstance } from '../../service'
import { Dispatch } from 'redux'
import {
  ProductTypeAction,
  ICartResult,
  IActionAddToCart,
  IActionRemoveFromCart,
} from '../actionTypes'
import { ProductActionTypeEnum, CartActionTypeEnum } from '../actionEnumTypes'

export const fetchProducts = () => {
  return async (dispatch: Dispatch<ProductTypeAction>) => {
    dispatch({ type: ProductActionTypeEnum.LOADING })

    try {
      let { data } = await AxiosProductInstance.get('GetProductsInfo')

      if (data.length == 0) {
        dispatch({ type: ProductActionTypeEnum.NOT_FOUND, payload: [] })
      } else {
        dispatch({ type: ProductActionTypeEnum.DATA, payload: data })
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: ProductActionTypeEnum.ERROR, payload: error.message })
      }
    }
  }
}

export const AddToCart = (product: ICartResult) => {
  return (dispatch: Dispatch<IActionAddToCart>) => {
    dispatch({ type: CartActionTypeEnum.ADD_TO_CART, payload: product })
  }
}

export const RemoveFromCart = (productId: number) => {
  return (dispatch: Dispatch<IActionRemoveFromCart>) => {
    dispatch({ type: CartActionTypeEnum.REMOVE_FROM_CART, payload: productId })
  }
}
