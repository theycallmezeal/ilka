Vue.component("view-story", {
	props: ["title"],
	template: `
		<div>
			<p>title: {{ title }}</p>
		</div>
	`
});

Vue.component("view-passage", {
	props: ["speaker", "text"],
	template: `
		<div>
			<p>speaker: {{ speaker }}</p>
			<p>{{ text }}</p>
		</div>
	`
});

Vue.component("view-mcq", {
	props: ["question", "answers", "indexOfCorrect"],
	template: `
		<div>
			<p>question: {{ question }}</p>
			<p v-for="(answer, i) in answers">{{ answer }} <span v-if="i == indexOfCorrect">(correct!)</span></p>
			<p>index of correct: {{ indexOfCorrect }}</p>
		</div>
	`
});

var app = new Vue({
	el: "#app",
	data: {
	}
});