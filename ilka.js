class Passage {
	constructor(speaker, text) {
		this.speaker = speaker;
		this.text = text;
	}
}

class MCQ {
	constructor(question, answers, indexOfCorrect) {
		this.question = question;
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
