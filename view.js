Vue.component("view-story", {
	props: ["storyObject"],
	template: `
		<div>
			<h1>{{ storyObject.title }}</h1>
			<div v-for="item in this.$parent.visibleItems">
				<view-passage v-if="item.type == 'passage'" v-bind:speaker="item.speaker" v-bind:text="item.text" v-bind:translation="item.translation" v-bind:ipa="item.ipa"></view-passage>
				<view-mcq v-if="item.type == 'mcq'" v-bind:question="item.question" v-bind:translation="item.translation" v-bind:answers="item.answers" v-bind:answerTranslations="item.answerTranslations" v-bind:indexOfCorrect="item.indexOfCorrect"></view-mcq>
				<view-free-response v-if="item.type == 'free-response'" v-bind:question="item.question" v-bind:translation="item.translation" v-bind:suggested="item.suggested" v-bind:suggestedTranslation="item.suggestedTranslation"></view-free-response>
			</div>
		</div>
	`
});

Vue.component("view-passage", {
	props: ["speaker", "text", "translation", "ipa"],
	data: function () {
		return {
			toggle: false
		};
	},
	template: `
		<div class="passage">
			<p class="passage-speaker">{{ speaker }}</p>
			<p>{{ text }} <button class="icon-button" @click="toggle = !toggle">&#127757;</button> <button class="icon-button" v-if="ipa && ipa != ''" @click="$root.speak(ipa)">&#128266;</button></p>
			<p v-if="toggle" class="translation">{{ translation }}</p>
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
			<p class="question">{{ question }} <button class="icon-button" @click="toggle = !toggle">&#127757;</button></p>
			<p class="question translation" v-if="toggle">{{ translation }}</p>
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
			<p>{{ answer }} <button class="icon-button" @click="toggle = !toggle">&#127757;</button> <span v-if="toggle" class="translation">{{ answerTranslation }}</span></p>
			<p>
				<button class="icon-button mcq-feedback-correct" v-if="hasBeenSelected && isCorrect">&check;</button>
				<button class="icon-button mcq-feedback-wrong" v-else-if="hasBeenSelected">&#10005;</button>
				<button class="icon-button" v-else-if="!hasBeenSelected && isCorrect" @click="$parent.revealAll()">&#9711;</button>
				<button class="icon-button" v-else @click="hasBeenSelected = true">&#9711;</button>
			</p>
		</div>
	`
});

Vue.component("view-free-response", {
	props: ["question", "translation", "suggested", "suggestedTranslation"],
	template: `
		<div class="view-free-response">
			<p class="question">{{ question }}</p>
			<input>
			<p>suggested: {{ suggested }}</p>
			<p>suggested translation: {{ suggestedTranslation }}</p>
		</div>
	`
});

var app = new Vue({
	el: "#app",
	data: {
		story: {
			title: "Upload a story...",
			items: [
			]
		},
		
		progress: 0,
		storyUploaded: false
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
		},

		speak: speak
	},
	
	computed: {
		visibleItems: function() {
			return this.story.items.slice(0, this.progress);
		}
	}
});
