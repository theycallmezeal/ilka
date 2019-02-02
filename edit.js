Vue.component("edit-story", {
	props: ["storyObject"],
	template: `
		<div>
			<p>title:
				<input v-model="storyObject.title">
			</p>
			<div v-for="(item, index) in storyObject.items">
				<edit-passage v-if="item.type == 'passage'"  :speaker.sync="item.speaker" :text.sync="item.text" :translation.sync="item.translation"></edit-passage>
				<edit-mcq v-if="item.type == 'mcq'" v-bind:index="index" question.sync="item.question" :answers.sync="item.answers" :indexOfCorrect.sync="item.indexOfCorrect" :answerTranslations.sync="item.answerTranslations"></edit-mcq>
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
	props: ["index", "question", "translation", "answers", "answerTranslations", "indexOfCorrect" ],
	methods: {
	},
	template: `
		<div class="mcq">
			<p>question:
			<input :value="question" @input="$emit('update:question', $event.target.value)">
			Translation: <input :value="translation" @input="$emit('update:translation', $event.target.value)">
			</p>
			<p v-for="(answer, i) in answers">
				<input :value="answer" @input="updateArray(this.answers, i, $event.target.value, 'update:answers')">
				<input :value="answerTranslations[i]" @input="updateArray(this.answerTranslations, i, $event.target.value, 'update:answerTranslations')">
			</p>
			<button @click="$root.addAnswer(index)">Add Answer</button>
		</div>
	`
});

var app = new Vue({
	el: "#app",
	data: {
		story: {
			title: "",
			items: []
		}
	},
	methods: {
		addAnswer: function(i) {
			var mc = this.story.items[i];
			mc.answers.push("new");
			mc.answerTranslations.push("translate");
		}
	}
});
