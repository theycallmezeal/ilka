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

Vue.component("view-story", {
	props: ["storyObject"],
	template: `
		<div>
			<p>title: {{ storyObject.title }}</p>
			<div v-for="item in this.$parent.visibleItems">
				<view-passage v-if="item instanceof Passage" v-bind:speaker="item.speaker" v-bind:text="item.text"></view-passage>
				<view-mcq v-if="item instanceof MCQ" v-bind:question="item.question" v-bind:answers="item.answers" v-bind:indexOfCorrect="item.indexOfCorrect"></view-mcq>
			</div>
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
		sampleStory: {
			title: "beepis",
			items: [
				new Passage("Georg", "lol your house is on fire"),
				new Passage("Vicky", "dude wtf"),
				new MCQ("Whose house is on fire?", ["Georg", "Vicky"], 0),
				new Passage("Georg", "ayy lmao")
			]
		},
		
		progress: 0
	},
	
	methods: {
		incProgress: function() {
			if (this.progress + 1 < this.sampleStory.items.length) {
				this.progress++;
			}
			console.log(this.progress);
		},
		
		decProgress: function() {
			if (this.progress - 1 >= 0) {
				this.progress--;
			}
			console.log(this.progress);
		}
	},
	
	computed: {
		visibleItems: function() {
			return this.sampleStory.items.slice(0, this.progress);
		}
	}
});