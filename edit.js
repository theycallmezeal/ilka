Vue.component("edit-story", {
	props: ["storyObject"],
	template: `
		<div>
			<p>title:
				<input v-model="storyObject.title">
			</p>
			<div v-for="(item, index) in storyObject.items">
				<edit-passage v-if="item.type == 'passage'"  :speaker.sync="item.speaker" :text.sync="item.text" :translation.sync="item.translation"></edit-passage>
				<edit-mcq v-if="item.type == 'mcq'" v-bind:index="index" :question.sync="item.question" :translation.sync="item.translation" :answers.sync="item.answers" :indexOfCorrect.sync="item.indexOfCorrect" :answerTranslations.sync="item.answerTranslations"></edit-mcq>
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
				<input :value="answer" @input="$root.updateAns(index, i, $event.target.value)">
				<input :value="answerTranslations[i]" @input="$root.updateAnsTrans(index, i, $event.target.value)">
				<button @click="$root.removeAnswer(index, i)">Remove</button>
			</p>
			<p>Correct Answer:
			<select :value="indexOfCorrect" @selected="$emit('update:indexOfCorrect', $event.target.value)">
				<option v-for="(answer, i) in answers" v-bind:value="i"> {{ answer }} </option>
			</select>
			<p><button @click="$root.addAnswer(index)">Add Answer</button></p>
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
		},
		removeAnswer: function(i, question) {
			var mc = this.story.items[i];
			console.log(mc.answers);
			mc.answers.splice(question, 1);
			mc.answerTranslations.splice(question, 1);
			console.log(mc.answers);
		},
		updateAns: function(index, question, val) {
			var ans = this.story.items[index].answers;
			this.$set(ans, question, val);
		},
		updateAnsTrans: function(index, question, val) {
			var ans = this.story.items[index].answerTranslations;
			this.$set(ans, question, val);
		},
	}
});
