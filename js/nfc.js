const ndef = new NDEFReader();
let pageconsole = document.getElementById("console");

function writenfc()
{
    if ('NDEFWriter' in window) {
        if(document.getElementById("nfcTextbox").value != "")
        {
            console.log("not empty");
            checkMessage(document.getElementById("nfcTextbox").value);
            pageconsole.innerHTML += "not empty <br/>";
            ndef.write(
                document.getElementById("nfcTextbox").value
            ).then(() => {
                console.log("message written")
                pageconsole.innerHTML += "message written <br/>";
            }).catch(error => {
                console.log(`Write failed try again: ${error}`);
                pageconsole.innerHTML += `Write failed try again: ${error}<br/>`;
            });
        }
        else{
            console.log("textbox is empty");
            pageconsole.innerHTML += "textbox is empty<br/>";
        }
    }
   else{
        console.log("no writer");
        pageconsole.innerHTML += "no writer<br/>";
    }
}

function nfcHandler()
{
    if ('NDEFReader' in window) {
        //Scan and write NFC tags 

        ndef.scan().then(() => {
            console.log("Scan started successfully.");
            pageconsole.innerHTML += "Scan started successfully.<br/>";
            ndef.onreadingerror = () => {
                console.log("Cannot read data from the NFC tag. Try another one?");
            };
            ndef.onreading = event => {
                console.log("NDEF message read.");
                //Read the message on the tag
                console.log(event.message);

                const message = event.message;
                for (const record of message.records) {
                    console.log("Record type:  " + record.recordType);
                    readTextRecord(record);
                }
            };
        }).catch(error => {
            console.log(`Error! Scan failed to start: ${error}.`);
        });
    }
    else{
        console.log("no reader");
    }
}

function readTextRecord(record) {
    console.assert(record.recordType === "text");
    const textDecoder = new TextDecoder(record.encoding);
    let message = textDecoder.decode(record.data);
    console.log(`Text: ${message} (${record.lang})`);
    
    //play sound based on the tag scanned
    pageconsole.innerHTML += `${message}<br/>`;
    checkMessage(message);
}

function checkMessage(message){
    let klank = new Audio(`https://stud.hosted.hr.nl/1012825/cle4/sound/${message}.mp3`)
    console.log(`https://stud.hosted.hr.nl/1012825/cle4/sound/${message}.mp3`);
    klank.play().catch(console.log);
    console.log(`play ${klank} message ${message}`);
}


document.getElementById('permissionButton').addEventListener('click', nfcHandler);
document.getElementById('writeButton').addEventListener('click', writenfc);
