const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const removebgAPI = 'e8PFSTbSXCzHDLnaByartPSU'; // get api key from remove.bg //
const inputPath = `./path.jpg`; // enter your image path
const formData = new FormData();
formData.append('size', 'auto');
formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath));
axios({
    method: 'post',
    url: 'https://api.remove.bg/v1.0/removebg',
    data: formData,
    responseType: 'arraybuffer',
    headers: {
        ...formData.getHeaders(),
        'X-Api-Key': removebgAPI,
    },
    encoding: null
}).then((response) => {
    if (response.status != 200) return console.error('Error:', response.status, response.statusText);
    fs.writeFileSync("./no-bg.png", response.data);
}).catch((error) => {
    return console.error('Request failed:', error);
});
