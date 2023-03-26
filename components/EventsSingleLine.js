const EventsSingleLineStylesTemplate = document.createElement('template');
EventsSingleLineStylesTemplate.innerHTML = `
	<style>
		.grid-holder {
			display: grid;
			grid-template-columns: 1fr;
			align-items: center;
			text-align: center;
		}
		.event {
			display: grid;
			grid-template-columns: 1fr;
			column-gap: 1em;
			row-gap: 1em;
			cursor: pointer;
			transition: opacity 300ms ease-out;
			margin-bottom: .5em;
		}
		.event:hover {
			opacity: 0.7;
		}
		.event .event-name {
			font-size: 2em;
			font-weight: 600;
		}
		.event .event-date {
			font-size: 1.2em;
			font-weight: 600;
		}
		.timeline {
			min-height: 10em;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
		}
		.timeline:before {
			content: '';
			position: absolute;
			top: 0;
			left: 50%;
			transform: translateX(-50%);
			width: 3px;
			height: 100%;
			background-color: #3f84e3;
		}
		.timeline .event-dot {
			width: 1.2em;
			height: 1.2em;
			border-radius: 50%;
			background-color: #011e3c;
			border: 2px solid #fff;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
		}
		@media (max-width: 1000px) {
			.event .event-name {
				font-size: 1.5em;
			}
			.event .event-date {
				font-size: 1em;
			}
			.timeline {
				margin: 0 1em;
			}
		}
		@media (max-width: 600px) {
			.timeline {
				margin: 0 0.5em;
			}
		}
	</style>`;

const singleTimelineClickHandler = (index) => {
	const data = events.singleLine[index];
	toggleModalDisplay(`
		<h3>${data.name}</h3>
		<div class="event-date-row">
			<span>${data.date}</span>
		</div>
		<p>${data.description}</p>
	`);
}

class EventsSingleLine extends HTMLElement {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.append(EventsSingleLineStylesTemplate.content.cloneNode(true));

		if (events?.singleLine?.length > 0) {
			for (let ind in events.singleLine) {
				shadowRoot.innerHTML += `
					<div class="grid-holder">
						<div class="timeline">
							<div class="event-dot"></div>
						</div>
						<div class="event" onclick="singleTimelineClickHandler(${ind})">
							<span class="event-name">${events.singleLine[ind].name}</span>
							<span class="event-date">${events.singleLine[ind].date}</span>
						</div>
					</div>`;
			}
		}
	}
}

customElements.define('events-single-line', EventsSingleLine);