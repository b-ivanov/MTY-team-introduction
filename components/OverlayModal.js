const OverlayModalTemplate = document.createElement('template');
OverlayModalTemplate.innerHTML = `
	<style>
		@keyframes fadeDown {
			from {
				top: -50px;
				opacity: 0;
			} to {
				top: 0px;
				opacity: 1;
			}
		}
		.modal-background {
			background-color: #22222299;
			position: absolute;
			top: 0px;
			width: 100%;
			height: 100%;
			text-align: center;
			animation: fadeDown 200ms linear;
			z-index: 10;
		}
		.modal-container {
			background: #011e3c;
			box-shadow: 0px 0px 1em #98a2b3;
			border-radius: 1em;
			margin-top: 10em;
			padding: 2em;
			display: inline-block;
			font-size: 1.5em;
			max-width: 50%;
			z-index: 11;
		}
	</style>
	<div class="modal-background" onclick="toggleModalDisplay(event)">
		<div class="modal-container">
			<slot></slot>
		</div>
	</div>
`;

class OverlayModal extends HTMLElement {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.append(OverlayModalTemplate.content.cloneNode(true));
	}
}

customElements.define('overlay-modal', OverlayModal);