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
	props: ["question", "translation", "answers", "answerTranslations", "indexOfCorrect", ],
	methods: {
		updateAnswer: function(i, answer) {
			this.$set(this.answers, i, answer);
			this.$emit("update:answers", this.answers);
		}
	},
	template: `
		<div class="mcq">
			<p>question:
			<input :value="question" @input="$emit('update:question', $event.target.value)">
			Translation: <input :value="translation" @input="$emit('update:translation', $event.target.value)">
			</p>
			<p v-for="(answer, i) in answers">
				<input :value="answer" @input="updateAnswer(i, $event.target.value)">
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
		}
	},
});
