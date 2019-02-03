Vue.component("edit-story", {
	props: ["storyObject"],
	template: `
		<div>
			<p>
				<input id="title-input" placeholder="Title" type="text" v-model="storyObject.title">
			</p>
			<div v-for="(item, index) in storyObject.items">
				<edit-passage v-if="item.type == 'passage'" v-bind:index="index" :speaker.sync="item.speaker" :text.sync="item.text" :translation.sync="item.translation" :ipa.sync="item.ipa"></edit-passage>
				<edit-mcq v-if="item.type == 'mcq'" v-bind:index="index" :question.sync="item.question" :translation.sync="item.translation" :answers.sync="item.answers" :indexOfCorrect.sync="item.indexOfCorrect" :answerTranslations.sync="item.answerTranslations"></edit-mcq>
				<edit-free-response v-if="item.type == 'free-response'" v-bind:index="index" :question.sync="item.question" :translation.sync="item.translation" :suggested.sync="item.suggested" :suggestedTranslation.sync="item.suggestedTranslation"></edit-mcq>
			</div>
		</div>
	`
});

Vue.component("edit-passage", {
	props: ["index", "speaker", "text", "translation", "ipa"],
	template: `
		<div class="edit-passage">
			<p>
				<input placeholder="Speaker" type="text" :value="speaker" @input="$emit('update:speaker', $event.target.value)">
			</p>
			<p>
				<input placeholder="Text" type="text" :value="text" @input="$emit('update:text', $event.target.value)">
			</p>
			<p>
				<input placeholder="Translation" type="text" :value="translation" @input="$emit('update:translation', $event.target.value)" >
			</p>
			<p>
				<input placeholder="IPA" type="text" :value="ipa" @input="$emit('update:ipa', $event.target.value)">
			</p>
			<div class="modify">
				<button class="icon-button" v-bind:disabled="index == 0" @click="$root.moveUp(index)">&uarr;</button>
				<button class="icon-button" v-bind:disabled="index == $parent.storyObject.items.length - 1" @click="$root.moveDown(index)">&darr;</button>
				<button class="icon-button remove" @click="$root.remove(index)">&#10005;</button>
			</div>
		</div>
	`
});

Vue.component("edit-mcq", {
	props: ["index", "question", "translation", "answers", "answerTranslations", "indexOfCorrect" ],
	methods: {
	},
	template: `
		<div class="edit-mcq">
			<p>
				<input placeholder="Question" type="text" :value="question" @input="$emit('update:question', $event.target.value)">
				<input placeholder="Translation" type="text" :value="translation" @input="$emit('update:translation', $event.target.value)">
			</p>
			<p>
				<select name="correct" :value="indexOfCorrect" @selected="$emit('update:indexOfCorrect', $event.target.value)">
					<option v-for="(answer, i) in answers" v-bind:value="i"> {{ answer }} </option>
				</select>
			</p>
			<p v-for="(answer, i) in answers">
				<input placeholder="Answer" type="text" :value="answer" @input="$root.updateAns(index, i, $event.target.value)">
				<input placeholder="Translation" type="text" :value="answerTranslations[i]" @input="$root.updateAnsTrans(index, i, $event.target.value)">
				<button class="icon-button" @click="$root.removeAnswer(index, i)">&#10005;</button>
			</p>
				<button class="icon-button" @click="$root.addAnswer(index)">+</button>
			<div class="modify">
				<button class="icon-button" v-bind:disabled="index == 0" @click="$root.moveUp(index)">&uarr;</button>
				<button class="icon-button" v-bind:disabled="index == $parent.storyObject.items.length - 1" @click="$root.moveDown(index)">&darr;</button>
				<button class="icon-button remove" @click="$root.remove(index)">&#10005;</button>
			</div>
		</div>
	`
});

Vue.component("edit-free-response", {
	props: ["index", "question", "translation", "suggested", "suggestedTranslation"],
	template: `
		<div class="edit-free-response">
			<p>
				<input placeholder="Question" type="text" :value="question" @input="$emit('update:question', $event.target.value)">
			</p>
			<p>
				<input placeholder="Translation" type="text" :value="translation" @input="$emit('update:translation', $event.target.value)">
			</p>
			<p>
				<input placeholder="Suggested answer" type="text" :value="suggested" @input="$emit('update:suggested', $event.target.value)">
			</p>
			<p>
				<input placeholder="Suggested answer translation" type="text" :value="suggestedTranslation" @input="$emit('update:suggestedTranslation', $event.target.value)">
			</p>
			<div class="modify">
				<button class="icon-button" v-bind:disabled="index == 0" @click="$root.moveUp(index)">&uarr;</button>
				<button class="icon-button" v-bind:disabled="index == $parent.storyObject.items.length - 1" @click="$root.moveDown(index)">&darr;</button>
				<button class="icon-button remove" @click="$root.remove(index)">&#10005;</button>
			</div>
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
		addPassage: function() {
			this.story.items.push(new Passage('', '', '', ''));
		},
		addMCQ: function() {
			this.story.items.push(new MCQ('', '', [''], [''], 0));
		},
		addFreeResponse: function() {
			this.story.items.push(new FreeResponse('', '', '', ''));
		},
		addAnswer: function(i) {
			var mc = this.story.items[i];
			mc.answers.push("");
			mc.answerTranslations.push("");
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
