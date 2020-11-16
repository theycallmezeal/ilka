var app = Vue.createApp({
	data: function() {
		return {
			story: {
				title: "Upload a story...",
				items: [
				]
			},
			
			progress: 0,
			storyUploaded: false
		};
	},
	
	methods: {
		incProgress: function() {
			if (this.progress + 1 <= this.story.items.length) {
				this.progress++;
			}
		},
		
		decProgress: function() {
			if (this.progress - 1 >= 0) {
				this.progress--;
			}
		},

		speak: speak
	},
	
	computed: {
		visibleItems: function() {
			return this.story.items.slice(0, this.progress);
		}
	}
});

app.component("view-story", {
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

app.component("view-passage", {
	props: ["speaker", "text", "translation", "ipa"],
	data: function() {
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

app.component("view-mcq", {
	props: ["question", "translation", "answers", "answerTranslations", "indexOfCorrect"],
	data: function() {
		return {
			toggle: false,
			isRevealed: new Array(this.answers.length).fill(false)
		}
	},
	methods: {
		reveal: function(i) {
			if (this.indexOfCorrect == i) {
				this.isRevealed.fill(true);
			} else {
				this.isRevealed[i] = true;
			}
		}
	},
	template: `
		<div class="mcq">
			<p class="question">{{ question }} <button class="icon-button" @click="toggle = !toggle">&#127757;</button></p>
			<p class="question translation" v-if="toggle">{{ translation }}</p>
			<view-mcq-answer v-on:reveal-event="reveal" v-for="(answer, i) in answers" v-bind:index="i" v-bind:answer="answer" v-bind:answerTranslation="answerTranslations[i]" v-bind:isCorrect="i == indexOfCorrect" v-bind:isRevealed="isRevealed[i]"></view-mcq-answer>
		</div>
	`
});

app.component("view-mcq-answer", {
	props: ["index", "answer", "answerTranslation", "isCorrect", "isRevealed"],
	data: function() {
		return {
			toggle: false
		}
	},
	template: `
		<div class="mcq-answer-wrapper">
			<div class="mcq-answer">
				<p>{{ answer }} <button class="icon-button" @click="toggle = !toggle">&#127757;</button></p>
				<p>
					<button class="icon-button mcq-feedback-correct" v-if="isRevealed && isCorrect">&check;</button> <!-- right -->
					<button class="icon-button mcq-feedback-wrong" v-else-if="isRevealed">&#10005;</button> <!-- wrong -->
					<button class="icon-button" v-else @click="$emit('reveal-event', index)">&#9711;</button> <!-- not revealed -->
				</p>
			</div>
			<p v-if="toggle" class="translation">{{ answerTranslation }}</p>
		</div>
	`
});

app.component("view-free-response", {
	props: ["question", "translation", "suggested", "suggestedTranslation"],
	data: function() {
		return {
			suggestedToggle: false,
			translationToggle: false
		}
	},
	template: `
		<div class="view-free-response">
			<p class="question">{{ question }}</p>
			<textarea placeholder="Your response here..."></textarea>
			<div class="free-response-suggested-gui">
				<button v-on:click="suggestedToggle = !suggestedToggle">View suggested answer</button>
				<div v-bind:class="['free-response-suggested', suggestedToggle ? '' : 'free-response-suggested-hidden']">
					<p>{{ suggested }} <button class="icon-button" @click="translationToggle = !translationToggle">&#127757;</button></p>
					<p v-if="translationToggle" class="translation">{{ suggestedTranslation }}</p>
				</div>
			</div>
		</div>
	`
});

app = app.mount("#app");