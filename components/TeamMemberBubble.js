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
		.team-member-bubble .member-type {
			text-transform: uppercase;
			font-size: 1.5em;
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
		const isMentor = type === 'mentor';
		const bubbleColor = isMentor ? '#ffc943' : '#08a67c';

		const spanName = document.createElement('span');
		spanName.className = 'member-name';
		spanName.innerHTML = memberData.name;
		const image = document.createElement('img');
		image.setAttribute('src', `src/${type}.jpg`);
		image.style.borderColor = bubbleColor;
		const spanType = document.createElement('div');
		spanType.className = 'member-type';
		spanType.style.color = bubbleColor;
		spanType.innerHTML = isMentor ? 'ментор' : 'младеж';
		const spanJob = document.createElement('span');
		spanJob.className = 'member-title';
		spanJob.innerHTML = memberData.jobTitle;

		this.container.appendChild(spanName);
		this.container.appendChild(image);
		this.container.appendChild(spanType);
		this.container.appendChild(spanJob);
		this.container.onclick = (ev) => {
			toggleModalDisplay(ev, this.getModalBody(type));
		};
	}

	getModalBody (type) {
		const data = team[type];
		const isMentor = type === 'mentor';
		const color = isMentor ? '#ffc943' : '#08a67c';
		return `
			<h3>${data.name}</h3>
			<div>${data.jobTitle}</div>
			<div style="color: ${color}; text-transform: uppercase;">${isMentor ? 'ментор' : 'младеж'}</div>
			<p style="text-align: left;">${data.description}</p>
			<p>Интереси:${data.interests.map((interest) => {
				return `<span style="background: ${color};">${interest}</span>`
			}).join('')}</p>
			<div class="social-links">
				<a href="${data.linkedin}" target="_blank">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="#98a2b3" xmlns="http://www.w3.org/2000/svg">
						<path d="M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27188 6.51094 3.27188 5.37187C3.27188 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8937V14.8828C16.8937 13.5562 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2937 12.9094 14.7891V20.4516H9.35625V8.99531H12.7687V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z" fill="currentColor"></path>
					</svg>
				</a>
				<a href="${data.github}" target="_blank">
					<svg width="24" height="24" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#fff"/>
					</svg>
				</a>
				<a href="${data.facebook}" target="_blank">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="#98a2b3" xmlns="http://www.w3.org/2000/svg">
						<path d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z" fill="currentColor"></path>
					</svg>
				</a>
			</div>
		`;
	}
}

customElements.define('team-member-bubble', TeamMemberBubble);