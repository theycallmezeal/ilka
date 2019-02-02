class Passage {
	constructor(speaker, text) {
		this.speaker = speaker;
		this.text = text;
	}
}

class MCQ {
	constructor(question, answers, indexOfCorrect) {
		this.question = question;
		this.answers = answers;
		this.indexOfCorrect = indexOfCorrect;
	}
}

Vue.prototype.Passage = Passage;
Vue.prototype.MCQ = MCQ;

Vue.component("edit-story", {
	props: ["storyObject"],
	template: `
		<div>
			<p>title: {{ storyObject.title }}</p>
			<input v-model="storyObject.title">
			<div v-for="item in storyObject.items">
				<edit-passage v-if="item instanceof Passage" v-bind:speaker="item.speaker" v-bind:text="item.text"></edit-passage>
				<edit-mcq v-if="item instanceof MCQ" v-bind:question="item.question" v-bind:answers="item.answers" v-bind:indexOfCorrect="item.indexOfCorrect"></edit-mcq>
			</div>
		</div>
	`
});

Vue.component("edit-passage", {
	props: ["speaker", "text"],
	template: `
		<div>
			<p>speaker:
			<input v-model="speaker">
			</p>
			<input v-model="text">
		</div>
	`
});

Vue.component("edit-mcq", {
	props: ["question", "answers", "indexOfCorrect"],
	template: `
		<div>
			<p>question:
			<input v-model="question">
			</p>
			<p v-for="(answer, i) in answers">
				<input v-model="answers[i]">
				<span v-if="i == indexOfCorrect">(correct!)</span>
				<button v-on:click="answers.splice(i, 1)">Remove</button>
			</p>
			<button v-on:click="answers.push('new')">Add Answer</button>
			<p>index of correct: {{ indexOfCorrect }}</p>
			<select v-model="indexOfCorrect">
				<option v-for="(answer, i) in answers" v-bind:value="i">
					{{ answer }}
				</option>
			</select>
		</div>
	`
});

var app = new Vue({
	el: "#app",
	data: {
		sampleStory: {
			title: "beepis",
			items: [
				new Passage("Georg", "lol your house is on fire"),
				new Passage("Vicky", "dude wtf"),
				new MCQ("Whose house is on fire?", ["Georg", "Vicky"], 0),
				new Passage("Georg", "ayy lmao")
			]
		},
	}
});
