class Passage {
	constructor(speaker, text, translation) {
		this.speaker = speaker;
		this.text = text;
		this.translation = translation;
	}
}

class MCQ {
	constructor(question, translation, answers, answerTranslations, indexOfCorrect) {
		this.question = question;
		this.translation = translation;
		this.answers = answers;
		this.answerTranslations = answerTranslations;
		this.indexOfCorrect = indexOfCorrect;
	}
}

Vue.prototype.Passage = Passage;
Vue.prototype.MCQ = MCQ;

// https://stackoverflow.com/a/30800715
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
	downloadObjectAsJson(app.story, app.story.title);
}
// Based on https://stackoverflow.com/a/754398
function load() {
	var file = document.getElementById("file").files[0];
	if (file) {
		var reader = new FileReader();
		reader.readAsText(file, "UTF-8");
		reader.onload = function (evt) {
            var j = JSON.parse(evt.target.result);
			app.story.title = j.title;
			app.story.items = j.items;
		}
	}
}
