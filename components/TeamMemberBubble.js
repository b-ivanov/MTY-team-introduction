const TeamMemberBubbleTemplate = document.createElement('template');
TeamMemberBubbleTemplate.innerHTML = `
	<style>
		.team-member-bubble {
			transition: opacity 300ms ease-out;
			cursor: pointer;
		}
		.team-member-bubble:hover {
			opacity: 0.8;
		}
		.team-member-bubble .member-name {
			font-weight: 900;
			font-size: 2.5em;
		}
		.team-member-bubble img {
			width: 100%;
			border-radius: 50%;
			border: 1em solid #fff;
			box-sizing: border-box;
			margin: 1em 0px;
		}
		.team-member-bubble .member-title {
			font-size: 1.5em;
		}
	</style>
	<div class="team-member-bubble"></div>
`;

class TeamMemberBubble extends HTMLElement {
	container = null;

	constructor() {
		super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.append(TeamMemberBubbleTemplate.content.cloneNode(true));
		
		this.container = shadowRoot.querySelector('.team-member-bubble');
	}

	static get observedAttributes() { 
		return ['data-type']; 
	}

	attributeChangedCallback (name, oldValue, newValue) {
		this.addBodyToShadowDOM(newValue);
	}

	addBodyToShadowDOM (type) {
		if (!type) return undefined;

		this.container.innerHTML = '';
		const memberData = team[type];

		const spanName = document.createElement('span');
		spanName.className = 'member-name';
		spanName.innerHTML = memberData.name;
		const image = document.createElement('img');
		image.setAttribute('src', `src/${type}.jpg`);
		image.style.borderColor = type === 'mentor' ? '#ffc943' : '#08a67c';
		const spanJob = document.createElement('span');
		spanJob.className = 'member-title';
		spanJob.innerHTML = memberData.jobTitle;

		this.container.appendChild(spanName);
		this.container.appendChild(image);
		this.container.appendChild(spanJob);
	}
}

customElements.define('team-member-bubble', TeamMemberBubble);