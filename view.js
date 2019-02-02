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
		<div class="passage">
			<p>speaker: {{ speaker }}</p>
			<p>{{ text }}</p>
		</div>
	`
});

Vue.component("view-mcq", {
	props: ["question", "answers", "indexOfCorrect"],
	data: function() {
		return {
			hasBeenSelected: new Array(this.$props.answers.length).fill(false)
		}
	},
	methods: {
		revealAll: function() {
			for (var i in this.hasBeenSelected) {
				this.$set(this.hasBeenSelected, i, true);
			}
		}
	},
	template: `
		<div class="mcq">
			<p>question: {{ question }}</p>
			<p v-for="(answer, i) in answers">{{ answer }}
				<span v-if="hasBeenSelected[i] && i == indexOfCorrect">correct!</span>
				<span v-else-if="hasBeenSelected[i]">wrong :(</span>
				<button v-else-if="!hasBeenSelected[i] && i == indexOfCorrect" v-on:click="revealAll()">CLICK MEH</button>
				<button v-else v-on:click="$set(hasBeenSelected, i, true)">CLICK MEH</button>
			</p>
			<p>index of correct: {{ indexOfCorrect }}</p>
		</div>
	`
});

var app = new Vue({
	el: "#app",
	data: {
		story: {
			title: "beepis",
			items: [
				new Passage("Georg", "lol your house is on fire"),
				new Passage("Vicky", "dude wtf"),
				new MCQ("Whose house is on fire?", ["Georg", "Vicky", "Jack", "Alex", "AJ", "Jacob"], 0),
				new Passage("Georg", "ayy lmao")
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
