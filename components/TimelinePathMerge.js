class TimelinePathMerge extends HTMLElement {
	container = null;

	constructor() {
		super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = `
			<style>
				.timeline-merge-grid-holder {
					display: grid;
					grid-template-columns: 30px auto 30px auto 30px;
					justify-content: space-between;
					margin: 0px calc(10em - 15px);
					background: linear-gradient(90deg, #08a67c 0%, #08a67c 50%, #ffc943 50%, #ffc943 100%);
					background-position: 50%;
					background-size: 100% 4px;
					background-repeat: no-repeat no-repeat;
				}
				.timeline-merge-grid-holder svg {
					margin: auto;
					background: #011e3c;
				}
			</style>
			<div class="timeline-merge-grid-holder">
				<svg height="30" width="30">
					<rect x="15" y="-15" width="30" height="30" rx="50" ry="50" stroke="#08a67c" stroke-width="4"  fill="none"/>
				</svg>
				<span></span>
				<svg height="30" width="30">
					<rect x="15" y="15" width="30" height="30" rx="50" ry="50" stroke="#ffc943" stroke-width="4"  fill="none"/>
					<rect x="-15" y="15" width="30" height="30" rx="50" ry="50" stroke="#08a67c" stroke-width="4"  fill="none"/>
				</svg>
				<span></span>
				<svg height="30" width="30">
					<rect x="-15" y="-15" width="30" height="30" rx="50" ry="50" stroke="#ffc943" stroke-width="4"  fill="none"/>
				</svg>
			</div>
		`;
		
		this.container = shadowRoot.querySelector('.team-member-bubble');
	}

	
}

customElements.define('timeline-path-merge', TimelinePathMerge);