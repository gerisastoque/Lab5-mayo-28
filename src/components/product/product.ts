import productStyles from './product.css';
import { dispatch } from '../../store/index';
import { ShoppingItem } from '../export';
import { saveShoppingData } from '../../store/actions';

export enum Attribute {
	'uid' = 'uid',
	'image' = 'image',
	'tittle' = 'tittle',
	'price' = 'price',
	'description' = 'description',
	'category' = 'category',
	'rating' = 'rating',
}

class Product extends HTMLElement {
	uid?: string;
	image?: string;
	tittle?: string;
	price?: string;
	description?: string;
	category?: string;
	rating?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		const attrs: Record<Attribute, null> = {
			uid: null,
			image: null,
			tittle: null,
			price: null,
			description: null,
			category: null,
			rating: null,
		};
		return Object.keys(attrs);
	}
	attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			default:
				this[propName] = newValue;
				break;
		}

		this.render();
	}

	render() {
		if (this.shadowRoot) {
			const css = this.ownerDocument.createElement('style');
			css.innerHTML = productStyles;
			this.shadowRoot.appendChild(css);

			const cardSection = this.ownerDocument.createElement('section');
			cardSection.className = 'card';
			cardSection.innerHTML = `
						<img class="image" src=${this.image}>
						<div class="info">
								<h1>${this.tittle}</h1>
								<p>${this.price}$</p>
								<p>${this.description}</p>
								<p>${this.category}</p>
								<p>${this.rating}</p>
						</div>
						<button id="button" class="button"><p>Add Shopping Cart</p></button>
				`;

			const addButton = cardSection.querySelector('#button');
			addButton?.addEventListener('click', () => {
				dispatch(saveShoppingData({ tittle: this.tittle, price: this.price, image: this.image }));
				localStorage.setItem('cart', JSON.stringify({ tittle: this.tittle, price: this.price, image: this.image }));
			});

			this.shadowRoot.appendChild(cardSection);
		}
	}
}

customElements.define('product-container', Product);
export default Product;
