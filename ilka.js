class Passage {
	constructor(speaker, text, translation) {
		this.speaker = speaker;
		this.text = text;
		this.translation = translation;
	}
}

class MCQ {
	constructor(question, translation, answers, indexOfCorrect) {
		this.question = question;
		this.translation = translation;
		this.answers = answers;
		this.indexOfCorrect = indexOfCorrect;
	}
}

Vue.prototype.Passage = Passage;
Vue.prototype.MCQ = MCQ;

function save() {

}

function load() {

}
