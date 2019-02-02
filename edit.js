Vue.component("edit-story", {
	props: ["storyObject"],
	template: `
		<div>
			<p>title:
				<input v-model="storyObject.title">
			</p>
			<div v-for="item in storyObject.items">
				<edit-passage v-if="item.type == 'passage'" :speaker.sync="item.speaker" :text.sync="item.text" :translation.sync="item.translation"></edit-passage>
				<edit-mcq v-if="item.type == 'mcq'" :question.sync="item.question" :answers.sync="item.answers" :indexOfCorrect.sync="item.indexOfCorrect" :answerTranslations.sync="item.answerTranslations"></edit-mcq>
			</div>
		</div>
	`
});

Vue.component("edit-passage", {
	props: ["speaker", "text", "translation"],
	template: `
		<div class="passage">
			<p>speaker:
			<input :value="speaker" @input="$emit('update:speaker', $event.target.value)">
			</p>
			<input :value="text" @input="$emit('update:text', $event.target.value)">
			Translation: <input :value="translation" @input="$emit('update:translation', $event.target.value)" >
		</div>
	`
});

Vue.component("edit-mcq", {
	props: ["question", "translation", "answers", "indexOfCorrect", "answerTranslations"],
	methods: {
		changeAnswer: function(i, val) {
			this.$set(answers, i, val);
			this.$emit('update:answers', this.answers);
		},
		removeAnswer: function (i) {
			this.answers.splice(i, 1);
			this.$emit('update:answers', this.answers);
		},
		addAnswer: function() {
			this.answers.push('new');
			this.$emit('update:answers', this.answers);
		},
		changeTrans: function(i, val) {
			this.$set(answerTranslations, i, val);
			this.$emit('update:answerTranslations', this.answerTranslations);
		}
	},
	template: `
		<div class="mcq">
			<p>question:
			<input :value="question" @input="$emit('update:question', $event.target.value)">
			Translation: <input :value="translation" @input="$emit('update:translation', $event.target.value)">
			</p>
			<p v-for="(answer, i) in answers">
				{{ answer }}
				<span v-if="i == indexOfCorrect">(correct!)</span>
				<input :value="answers[i]" @input="changeAnswer(i, $event.target.value)">
				Translation: <input :value="answerTranslations[i]", @input="changeTrans(i, $event.target.value)">
				<button v-on:click="removeAnswer(i)">Remove</button>
			</p>
			<button v-on:click="addAnswer(i)">Add Answer</button>
			<p>Correct Answer: {{ indexOfCorrect }}
			<select :value="indexOfCorrect" @selected="$emit('update:indexOfCorrect', $event.target.value)">
				<option v-for="(answer, i) in answers" v-bind:value="i">
					{{ answer }}
				</option>
			</select>
			</p>
		</div>
	`
});

var app = new Vue({
	el: "#app",
	data: {
		story: {
			title: "",
			items: []
		},
	},
});
