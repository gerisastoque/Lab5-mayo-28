import { getProductData } from '../store/actions';
import styles from './styles.css';
import { addObserver, appState, dispatch } from '../store/index';
import Product, { Attribute } from '../components/product/product';

export class Dashboard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	async connectedCallback() {
		const action = await getProductData();
		dispatch(action);
	}

	render() {
		appState.products.forEach((product: any) => {
			const card = this.ownerDocument.createElement('product-container') as Product;
			card.className = 'card';
			card.setAttribute(Attribute.image, product.image);
			card.setAttribute(Attribute.tittle, product.title);
			card.setAttribute(Attribute.price, product.price);
			card.setAttribute(Attribute.description, product.description);
			card.setAttribute(Attribute.category, product.category);
			this.shadowRoot?.appendChild(card);
		});

		const cssItems = this.ownerDocument.createElement('style');
		cssItems.innerHTML = styles;
		this.shadowRoot?.appendChild(cssItems);
	}
}

customElements.define('app-dashboard', Dashboard);
