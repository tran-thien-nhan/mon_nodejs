const fetch = require('node-fetch');
//npm i node-fetch@2

const postData = {
    message: "this is message from client",
};

fetch("http://localhost:3000/hello", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData),
})
    .then(response => response.text())
    .then(data => console.log("response from server:", data))
    .catch(error => console.log("error: ", error));
