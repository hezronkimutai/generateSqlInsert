var xlsx = require('node-xlsx');
var fs = require('fs')
var obj = xlsx.parse(__dirname + '/sfLegendLinks.xlsx'); // parses a file

var obj = xlsx.parse(fs.readFileSync(__dirname + '/sfLegendLinks.xlsx'));
let data = obj[0].data

data = data.map((item, index) => {
    if (index !== 0) {
        return ({
            clientId: item[0],
            clientName: item[1],
            status: item[2],
            clientType: item[3],
            billingType: item[4],
            mostRecentInvite: item[5],
            salesForceId: item[6],
            notes: item[7],
        })
    }
}).filter(Boolean);

const arr = data.map(client => {
    if (client.salesForceId && client.clientId) {
        return (`UPDATE clients SET sales_force_id= '${client.salesForceId}' WHERE id=${client.clientId};`)
    }
}).filter(Boolean);
// INSERT INTO section_instructions (section_id, language_key, instruction)

function makeid(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}

console.log(makeid(5));

const arr1 = data.map((client, index) => {
    if (client.salesForceId && client.clientId) {

        return (`INSERT INTO clients(
            id,
    name, prefix, status, type,
    parent_id,
    billing_type,
    price_per_assessment,
    setup_date,
    glossary_type,
    deactivation_date,
    deactivation_reason,
    access_standard_profiles)
    VALUES(
        '${client.clientId}'
        'Hubert Company',
            '${makeid(4)}',
            'ACTIVE',
            'DIRECT',
            null,
            'PROJECT',
            100,
            '2021-02-01 11:27:25',
            'STANDARD',
            '2021-02-01 11:27:25',
            null,
            null
        ); `);
    }
}).filter(Boolean);

var file = fs.createWriteStream('array.txt');
file.on('error', function (err) { /* error handling */ });
arr.forEach(function (v) { file.write(v + '\n'); });
file.end();

var file1 = fs.createWriteStream('array1.txt');
file1.on('error', function (err) { /* error handling */ });
arr1.forEach(function (v) { file1.write(v + '\n'); });
file1.end();