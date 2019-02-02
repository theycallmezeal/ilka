Vue.component("view-story", {
	props: ["storyObject"],
	template: `
		<div>
			<h1>{{ storyObject.title }}</h1>
			<div v-for="item in this.$parent.visibleItems">
				<view-passage v-if="item.type == 'passage'" v-bind:speaker="item.speaker" v-bind:text="item.text" v-bind:translation="item.translation"></view-passage>
				<view-mcq v-if="item.type == 'mcq'" v-bind:question="item.question" v-bind:translation="item.translation" v-bind:answers="item.answers" v-bind:answerTranslations="item.answerTranslations" v-bind:indexOfCorrect="item.indexOfCorrect"></view-mcq>
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
			<p class="passage-speaker">{{ speaker }}</p>
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
			<p class="mcq-question">{{ question }} <span v-on:click="toggle = !toggle">(?)</span></p>
			<p class="mcq-question" v-if="toggle">{{ translation }}</p>
			<view-mcq-answer v-for="(answer, i) in answers" v-bind:answer="answer" v-bind:answerTranslation="answerTranslations[i]" v-bind:isCorrect="i == indexOfCorrect"></view-mcq-answer>
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
		<div class="mcq-answer">
			<p>{{ answer }} <span v-on:click="toggle = !toggle">(?)</span> <span v-if="toggle">{{ answerTranslation }}</span></p>
			<p>
				<span v-if="hasBeenSelected && isCorrect">&check;</span>
				<span v-else-if="hasBeenSelected">X</span>
				<button v-else-if="!hasBeenSelected && isCorrect" v-on:click="$parent.revealAll()">&nbsp;</button>
				<button v-else v-on:click="hasBeenSelected = true">&nbsp;</button>
			</p>
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
