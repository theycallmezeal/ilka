Vue.component("edit-story", {
	props: ["storyObject"],
	template: `
		<div>
			<p>title:
				<input v-model="storyObject.title">
			</p>
			<div v-for="item in storyObject.items">
				<edit-passage v-if="item.type == 'passage'" v-bind:speaker="item.speaker" v-bind:text="item.text" v-bind:translation="item.translation"></edit-passage>
				<edit-mcq v-if="item.type == 'mcq'" v-bind:question="item.question" v-bind:answers="item.answers" v-bind:indexOfCorrect="item.indexOfCorrect" v-bind:answerTranslations="item.answerTranslations"></edit-mcq>
			</div>
		</div>
	`
});

Vue.component("edit-passage", {
	props: ["speaker", "text", "translation"],
	template: `
		<div class="passage">
			<p>speaker:
			<input v-model="speaker">
			</p>
			<input v-model="text">
			Translation: <input v-model="translation">
		</div>
	`
});

Vue.component("edit-mcq", {
	props: ["question", "translation", "answers", "indexOfCorrect", "answerTranslations"],
	template: `
		<div class="mcq">
			<p>question:
			<input v-model="question">
			Translation: <input v-model="translation">
			</p>
			<p v-for="(answer, i) in answers">
				<span v-if="i == indexOfCorrect">(correct!)</span>
				<input v-model="answers[i]">
				Translation: <input v-model="answerTranslations[i]">
				<button v-on:click="answers.splice(i, 1)">Remove</button>
			</p>
			<button v-on:click="answers.push('new')">Add Answer</button>
			<p>Correct Answer: {{ indexOfCorrect }}
			<select v-model="indexOfCorrect">
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
