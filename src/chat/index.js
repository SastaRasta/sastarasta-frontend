const senderMessageClasses = "bg-blue-100 text-gray-800 p-2 rounded ml-20"
const receiverMessageClasses = "bg-green-100 text-gray-800 p-2 rounded mr-20"

function setCookie(name,value,days) {
	var expires = "";
	if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

const setSenderChatTemplate = (msg) => `<div class="flex mb-2">
<div class="bg-blue-100 text-gray-800 p-2 rounded ml-20">
		${msg}
</div>
</div>`

const setReceiverChatTemplate = (msg) => `<div class="flex justify-end ">
<div class="bg-green-100 text-gray-800 p-2 rounded mr-20">
		${msg}
</div>
</div>`

const sendButton = document.getElementById("send")
const chatBox = document.getElementById("chat-messages")
const chatInput = document.getElementById("inp")

sendButton.addEventListener("click", () => {
	chatBox.innerHTML += setSenderChatTemplate(chatInput.value)

	fetch(`https://authrexapi.bharathshanmugam.dev/trip/chat?message=${chatInput.value}`, {
		headers: {
			"Authorization": `Bearer ${getCookie("access_token")}`
		}
	})
	.then(res => res.json())
	.then(data => {
		chatBox.innerHTML += setReceiverChatTemplate(data.response)
	})
	chatInput.value = ""
})