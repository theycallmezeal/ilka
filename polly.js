var creds = new AWS.Credentials();
creds.accessKeyId = accesskeyid;
creds.secretAccessKey = secretaccesskey;
var polly = new AWS.Polly({region: 'us-east-1', apiVersion: '2016-06-10', credentials: creds});

function speak(text) {
	var ssml = "<phoneme alphabet='ipa' ph='"+text+"'></phoneme>"
	var params = {
		OutputFormat: "mp3",
		VoiceId: "Aditi",
		Text: ssml,
		LanguageCode: "hi-IN",
		TextType: "ssml"
	};
	polly.synthesizeSpeech(params, function(err, data) {
		if (err) console.log(err, err.stack); // an error occurred
		else     console.log(data);           // successful response
});

}

function playaudio(audio) {
	var uInt8Array = new Uint8Array(audioStream);
	var arrayBuffer = uInt8Array.buffer;
	var blob = new Blob([arrayBuffer]);
	var url = URL.createObjectURL(blob);
	audioElement.src = url;
	audioElement.play();
}
