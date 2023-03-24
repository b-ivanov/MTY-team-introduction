const template = document.createElement('template');
template.innerHTML = `
	<style>
		
	</style>
	<div class="team-member-bubble"></div>
`;

class EventDoubleLine extends HTMLElement {
	container = null;

	constructor() {
		super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.append(template.content.cloneNode(true));
		
		this.container = shadowRoot.querySelector('.team-member-bubble');
	}

	static get observedAttributes() { 
		return ['data-type']; 
	}

	attributeChangedCallback (name, oldValue, newValue) {
		this.addBodyToShadowDOM(newValue);
	}
}

customElements.define('personal-event', EventDoubleLine);