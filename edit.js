var app = Vue.createApp({
	data: function () {
		return {
			story: {
				title: "",
				items: []
			}
		}
	},
	methods: {
		addPassage: function() {
			this.story.items.push(new Passage('', '', '', ''));
		},
		addMCQ: function() {
			this.story.items.push(new MCQ('', '', [''], [''], 0));
		},
		addFreeResponse: function() {
			this.story.items.push(new FreeResponse('', '', '', ''));
		},
		addMCQAnswer: function(mcqItemNumber) {
			var mcq = this.story.items[mcqItemNumber];
			mcq.answers.push("");
			mcq.answerTranslations.push("");
		},
		removeMCQAnswer: function(mcqItemNumber, answerIndex) {
			var mcq = this.story.items[mcqItemNumber];
			if (mcq.answers.length == 1) {
				return;
			}
			if (answerIndex <= mcq.indexOfCorrect && mcq.indexOfCorrect != 0) {
				mcq.indexOfCorrect--;
			}
			mcq.answers.splice(answerIndex, 1);
			mcq.answerTranslations.splice(answerIndex, 1);
		},
		moveUp: function(index) {
			var temp = this.story.items[index - 1];
			this.$set(this.story.items, index - 1, this.story.items[index]);
			this.$set(this.story.items, index, temp);
		},
		moveDown: function(index) {
			var temp = this.story.items[index + 1];
			this.$set(this.story.items, index + 1, this.story.items[index]);
			this.$set(this.story.items, index, temp);
		},
		remove: function(index) {
			this.story.items.splice(index, 1);
		}
	}
});

app = app.mount("#app");