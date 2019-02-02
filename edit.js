Vue.component("edit-story", {
	props: ["storyObject"],
	template: `
		<div>
			<p>title:
				<input v-model="storyObject.title">
			</p>
			<div v-for="item in storyObject.items">
				<edit-passage v-if="item instanceof Passage" v-bind:speaker="item.speaker" v-bind:text="item.text"></edit-passage>
				<edit-mcq v-if="item instanceof MCQ" v-bind:question="item.question" v-bind:answers="item.answers" v-bind:indexOfCorrect="item.indexOfCorrect" v-bind:answerTranslations="item.answerTranslations"></edit-mcq>
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
				<input v-model="answers[i]">
				<span v-if="i == indexOfCorrect">(correct!)</span>
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
			title: "beepis",
			items: [
				new Passage("Georg", "lol your house is on fire", "lol dein Haus ist in Brand geraten"),
				new Passage("Vicky", "dude wtf", "kerl was zum Teufel"),
				new MCQ("Whose house is on fire?", "Wessen Haus ist in Brand geraten?", ["Georg", "Vicky", "Jack", "Alex", "AJ", "Jacob"], ["Georg", "Vicky", "Jack", "Alex", "AJ", "Jacob"], 0),
				new Passage("Georg", "ayy lmao", "\u00e4yy lm\u00e4o")
			]
		},
	}
});
