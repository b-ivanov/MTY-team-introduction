const EventsDoubleLineStylesTemplate = document.createElement('template');
EventsDoubleLineStylesTemplate.innerHTML = `
	<style>
		.grid-holder {
			display: grid;
			grid-template-columns: 20em auto 20em;
			justify-content: space-between;
			align-items: center;
			text-align: center;
		}
		.event {
			display: grid;
			grid-template-columns: 1fr 1fr;
			column-gap: 1em;
			row-gap: 1em;
			cursor: pointer;
			transition: opacity 300ms ease-out;
		}
		.event:hover {
			opacity: 0.8;
		}
		.event .event-name {
			font-size: 2em;
			font-weight: 600;
			grid-column: 1 / 3;
		}
		.event .event-mentee-date {
			font-size: 1.2em;
			text-align: left;
			font-weight: 600;
		}
		.event .event-mentor-date {
			font-size: 1.2em;
			text-align: right;
			font-weight: 600;
		}
		.timeline {
			min-height: 10em;
			display: grid;
			align-items: center;
			justify-content: center;
		}
		.timeline.left {
			background: linear-gradient(90deg, #ffffff00 0%, #ffffff00 49%, #08a67cff 49%, #08a67cff 51%, #ffffff00 51%, #ffffff00 100%);
		}
		.timeline.right {
			background: linear-gradient(90deg, #ffffff00 0%, #ffffff00 49%, #ffc943ff 49%, #ffc943ff 51%, #ffffff00 51%, #ffffff00 100%);
		}
		.timeline .event-dot {
			width: 1.2em;
			height: 1.2em;
			border-radius: 50%;
			background-color: #011e3c;
			border: 2px solid #fff;
		}
	</style>`;

const EventsDoubleLineTemplate = document.createElement('template');
EventsDoubleLineTemplate.innerHTML = `
	<div class="grid-holder">
		<div class="timeline left">
			<div class="event-dot"></div>
		</div>
		<div class="event">
			<span class="event-name">
				<slot name="eventName"></slot>
			</span>
			<span class="event-mentee-date">
				<slot name="eventMenteeDate"></slot>
			</span>
			<span class="event-mentor-date">
				<slot name="eventMentorDate"></slot>
			</span>
		</div>
		<div class="timeline right">
			<div class="event-dot"></div>
		</div>
	</div>
`;

class EventsDoubleLine extends HTMLElement {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.append(EventsDoubleLineStylesTemplate.content.cloneNode(true));
		
		if (events?.doubleLine?.length > 0) {
			for (let ind in events.doubleLine) {
				shadowRoot.innerHTML += `
					<div class="grid-holder">
						<div class="timeline left">
							<div class="event-dot"></div>
						</div>
						<div class="event">
							<span class="event-name">${events.doubleLine[ind].name}</span>
							<span class="event-mentee-date">${events.doubleLine[ind].menteeDate}</span>
							<span class="event-mentor-date">${events.doubleLine[ind].mentorDate}</span>
						</div>
						<div class="timeline right">
							<div class="event-dot"></div>
						</div>
					</div>`;
			}
		}
	}
}

customElements.define('events-double-line', EventsDoubleLine);