const messagesContainer = document.querySelector('.messages-container');
const sendMessageButton = document.querySelector('#message-send');
const id = Math.floor(Math.random() * Date.now() / 1000000);

function isJSON(string) {
    try {
        JSON.parse(string);
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
}

function sendMessageToChat() {
  const message = document.querySelector('#message-field');

  ws.send(JSON.stringify({message: message.value, id: id}));

  message.value = '';
}

function addMessageToChatBoard(message) {
  const paragraph = document.createElement('p');

  let data = {};

  if (isJSON(message)) data = JSON.parse(message);

  if (data instanceof Object && data.id === id) {
    console.log(data)
    paragraph.classList.add('messages-container--paragraph__outcoming');
  }
  else {
    paragraph.classList.add('messages-container--paragraph__incoming');
  }
  console.log(data);
  paragraph.innerText = data.message ? data.message : message;

  messagesContainer.appendChild(paragraph);
}

sendMessageButton.addEventListener('click', sendMessageToChat);

const ws = new WebSocket('ws://localhost:3000');

ws.onopen = (e) => console.log('Open + e', e);
ws.onclose = (e) => console.log('Close + e', e);
ws.onmessage = (e) => {
  addMessageToChatBoard(e.data);
  console.log('Message + e', e);
}
ws.onerror = (e) => {
  console.log('Error + e', e.data)
};console.log(ws)
