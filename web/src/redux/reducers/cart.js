const initialState = []

export let cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_CART_ITEM': {
			let { product, quantity, variant } = action.payload
			let items = [...state]
			let currenItemIndex = items.findIndex(i => i.product._id === product._id && i.variant == variant)
			console.log(currenItemIndex)
			if (currenItemIndex !== -1) {
				items.splice(currenItemIndex, 1)
			}
			console.log(items)
			return [...items, { product, quantity, variant }];
		}
		case 'REMOVE_CART_ITEM': {
			return [...state.filter(s => s.product._id !== action.payload.productId)]
		}
		default: {
			return state;
		}
	}
}
