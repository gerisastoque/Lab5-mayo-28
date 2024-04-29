import styles from './ShoppingCartItem.css';

export enum AttributeItem {
	'tittle' = `tittle`,
	'image' = `image`,
	'price' = `price`,
}

class ShoppingItem extends HTMLElement {
	tittle?: string;
	image?: string;
	price?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributeItem, null> = {
			tittle: null,
			image: null,
			price: null,
		};

		return Object.keys(attrs);
	}
	attributeChangedCallback(propName: AttributeItem, oldValue: string, newValue: string) {
		switch (propName) {
			default:
				this[propName] = newValue;
				break;
		}
		this.render();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `

                  <div class='info-container '>
                      <p><b> Tittle: </b>${this.tittle}</p>
                      <p><b> Image: </b>${this.image}</p>
                      <p><b> Price: </b>${this.price}</p>
                  </div>
             </section>
             `;

			const cssItems = this.ownerDocument.createElement('style');
			cssItems.innerHTML = styles;
			this.shadowRoot?.appendChild(cssItems);
		}
	}
}

customElements.define('shopping-item', ShoppingItem);
export default ShoppingItem;
