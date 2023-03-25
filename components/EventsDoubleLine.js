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
			opacity: 0.7;
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
			background: linear-gradient(90deg, #08a67c 0%, #08a67c 100%);
			background-repeat: no-repeat no-repeat;
			background-position: 50%;
			background-size: 3px 100%;
		}
		.timeline.right {
			background: linear-gradient(90deg, #ffc943 0%, #ffc943 100%);
			background-repeat: no-repeat no-repeat;
			background-position: 50%;
			background-size: 3px 100%;
		}
		.timeline .event-dot {
			width: 1.2em;
			height: 1.2em;
			border-radius: 50%;
			background-color: #011e3c;
			border: 2px solid #fff;
		}
		@media (max-width: 1000px) {
			.grid-holder {
				grid-template-columns: 12em auto 12em;
			}
			.event .event-name {
				font-size: 1.5em;
			}
			.event .event-mentee-date, .event .event-mentor-date {
				font-size: 1em;
			}
		}
		@media (max-width: 600px) {
			.grid-holder {
				grid-template-columns: 10em auto 10em;
			}
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



const clickHandler = (index) => {
	const data = events.doubleLine[index];
	toggleModalDisplay(`
		<h3>${data.name}</h3>
		<div class="event-dates-row">
			<span>${data.menteeDate}</span>
			<span>${data.mentorDate}</span>
		</div>
		<p>${data.description}</p>
	`);
}

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
						<div class="event" onclick="clickHandler(${ind})">
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