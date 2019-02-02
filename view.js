Vue.component("view-story", {
	props: ["storyObject"],
	template: `
		<div>
			<p>title: {{ storyObject.title }}</p>
			<div v-for="item in this.$parent.visibleItems">
				<view-passage v-if="item instanceof Passage" v-bind:speaker="item.speaker" v-bind:text="item.text" v-bind:translation="item.translation"></view-passage>
				<view-mcq v-if="item instanceof MCQ" v-bind:question="item.question" v-bind:translation="item.translation" v-bind:answers="item.answers" v-bind:answerTranslations="item.answerTranslations" v-bind:indexOfCorrect="item.indexOfCorrect"></view-mcq>
			</div>
		</div>
	`
});

Vue.component("view-passage", {
	props: ["speaker", "text", "translation"],
	data: function () {
		return {
			toggle: false
		};
	},
	template: `
		<div class="passage">
			<p>speaker: {{ speaker }}</p>
			<p>{{ text }} <span v-on:click="toggle = !toggle">(?)</span></p>
			<p v-if="toggle">{{ translation }}</p>
		</div>
	`
});

Vue.component("view-mcq", {
	props: ["question", "translation", "answers", "answerTranslations", "indexOfCorrect"],
	data: function() {
		return {
			toggle: false
		}
	},
	methods: {
		revealAll: function() {
			for (i in this.$children) {
				this.$children[i].hasBeenSelected = true;
			}
		}
	},
	template: `
		<div class="mcq">
			<p>question: {{ question }} <span v-on:click="toggle = !toggle">(?)</span></p>
			<p v-if="toggle">translation: {{ translation }}</p>
			<view-mcq-answer v-for="(answer, i) in answers" v-bind:answer="answer" v-bind:answerTranslation="answerTranslations[i]" v-bind:isCorrect="i == indexOfCorrect"></view-mcq-answer>
			<p>index of correct: {{ indexOfCorrect }}</p>
		</div>
	`
});

Vue.component("view-mcq-answer", {
	props: ["answer", "answerTranslation", "isCorrect"],
	data: function() {
		return {
			hasBeenSelected: false,
			toggle: false
		}
	},
	template: `
		<div>
			<p>{{ answer }} <span v-on:click="toggle = !toggle">(?)</span>
					<span v-if="hasBeenSelected && isCorrect">correct!</span>
					<span v-else-if="hasBeenSelected">wrong :(</span>
					<button v-else-if="!hasBeenSelected && isCorrect" v-on:click="$parent.revealAll()">CLICK MEH</button>
					<button v-else v-on:click="hasBeenSelected = true">CLICK MEH</button>
			</p>
			<p v-if="toggle">{{ answerTranslation }}</p>
		</div>
	`
});

var app = new Vue({
	el: "#app",
	data: {
		story: {
			title: "beepis",
			items: [
				new Passage("Georg", "lol your house is on fire", "lol dein Haus ist in Brand geraten"),
				new Passage("Vicky", "dude wtf", "kerl was zum Teufel"),
				new MCQ("Whose house is on fire?", "Wessen Haus ist in Brand geraten?", ["Georg", "Vicky", "Jack", "Alex", "AJ", "Jacob"], ["Georg", "Vicky", "Jack", "Alex", "AJ", "Jacob"], 0),
				new Passage("Georg", "ayy lmao", "\u00e4yy lm\u00e4o")
			]
		},
		
		progress: 0
	},
	
	methods: {
		incProgress: function() {
			if (this.progress + 1 <= this.story.items.length) {
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
			return this.story.items.slice(0, this.progress);
		}
	}
});
