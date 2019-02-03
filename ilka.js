var jsonItems = null;

class Passage {
	constructor(speaker, text, translation, ipa) {
		this.type = "passage";
		this.speaker = speaker;
		this.text = text;
		this.translation = translation;
		this.ipa = ipa;
	}
}

class MCQ {
	constructor(question, translation, answers, answerTranslations, indexOfCorrect) {
		this.type = "mcq";
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
	var title = app.story.title;
	if (!title) {
		title = "story";
	}
	downloadObjectAsJson(app.story, title);
}
// Based on https://stackoverflow.com/a/754398
function load() {
	var file = document.getElementById("file").files[0];
	if (file) {
		var reader = new FileReader();
		reader.readAsText(file, "UTF-8");
		reader.onload = function (evt) {
            var j = JSON.parse(evt.target.result);
			jsonItems = j.items;
			console.log(jsonItems);
			app.story.title = j.title;
			app.story.items = [];
			for (i in j.items) {
				console.log("attempting to add " + j.items[i]);
				app.story.items.push(j.items[i]);
			}
		}
	}
	app.storyUploaded = true;
}
