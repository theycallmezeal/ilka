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


function downloadObjectAsJson(exportObj, exportName) {
	var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
	var downloadAnchorNode = document.createElement('a');
	downloadAnchorNode.setAttribute("href",		dataStr);
	downloadAnchorNode.setAttribute("download", exportName + ".json");
	document.body.appendChild(downloadAnchorNode); // required for firefox
	downloadAnchorNode.click();
	downloadAnchorNode.remove();
}
function save() {
	downloadObjectAsJson(app.story, "story");
}
function load() {

}
