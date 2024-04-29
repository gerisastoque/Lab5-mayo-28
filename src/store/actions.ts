import { getData } from '../service/getProducts';
import {
	getProductsAction,
	productsActions,
	getShoppingItemsAction,
	ShoppingItemsActions,
	saveShoppingItemsAction,
} from '../types/store';

export const getProductData = async (): Promise<getProductsAction> => {
	const data = await getData();
	console.log(data);

	return {
		action: productsActions.GETPRODUCTS,
		payload: data,
	};
};

export const getShoppingData = async (): Promise<getShoppingItemsAction> => {
	const data2 = await getData();
	console.log(data2);

	return {
		action: ShoppingItemsActions.GETSHOPPINGITEMS,
		payload: data2,
	};
};

export const saveShoppingData = async (): Promise<saveShoppingItemsAction> => {
	const data3 = await getData();
	console.log(data3);

	return {
		action: ShoppingItemsActions.SAVESHOPPINGITEMS,
		payload: data3,
	};
};
