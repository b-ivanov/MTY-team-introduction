const OverlayModalTemplate = document.createElement('template');
OverlayModalTemplate.innerHTML = `
	<style>
		@keyframes fadeDown {
			from {
				top: -50px;
				opacity: 0;
			} to {
				top: 7em;
				opacity: 1;
			}
		}
		.modal-background {
			background-color: #22222299;
			position: fixed;
    		top: 7em;
			width: 100%;
			height: 100%;
			text-align: center;
			animation: fadeDown 200ms linear;
			z-index: 10;
		}
		.modal-container {
			position: relative;
			background: #011e3c;
			box-shadow: 0px 0px 1em #98a2b3;
			border-radius: 1em;
			margin-top: 10em;
			padding: 2em;
			display: inline-block;
			font-size: 1.5em;
			max-width: 40%;
			z-index: 11;
		}
		.modal-container svg {
			position: absolute;
			top: 1em;
			right: 1em;
			fill: #fff;
			cursor: pointer;
		}
		.modal-container svg:hover {
			opacity: 0.7;
		}
	</style>
	<div class="modal-background">
		<div class="modal-container">
			<svg width="30" height="30" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" onclick="toggleModalDisplay()">
				<path d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"/>
			</svg>
			<slot></slot>
		</div>
	</div>
`;

class OverlayModal extends HTMLElement {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.append(OverlayModalTemplate.content.cloneNode(true));
		
		shadowRoot.querySelector('.modal-background').addEventListener('click', (event) => {
			if (event.target.className === 'modal-background') {
				toggleModalDisplay();
			}
		});
	}
}

customElements.define('overlay-modal', OverlayModal);