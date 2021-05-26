const ndef = new NDEFReader();

function writenfc()
{
    if ('NDEFWriter' in window) {
        if(document.getElementById("nfcTextbox").value != "")
        {
            console.log("not empty");
            ndef.write(
                document.getElementById("nfcTextbox").value
            ).then(() => {
                console.log("message written")
            }).catch(error => {
                console.log(`Write failed try again: ${error}`);
            });
        }
        else{
            console.log("textbox is empty");
        }
    }
   else{
        console.log("no writer");
    }
}

function nfcHandler()
{
    if ('NDEFReader' in window) {
        /* Scan and write NFC tags */

        ndef.scan().then(() => {
            console.log("Scan started successfully.");
            ndef.onreadingerror = () => {
                console.log("Cannot read data from the NFC tag. Try another one?");
            };
            ndef.onreading = event => {
                console.log("NDEF message read.");
                //Read the message on the tag
                readTextRecord(event.message);
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
    checkMessage(message);
}

function checkMessage(message){
    let klank = new Audio(`/sound/${message}.mp3`)
    klank.play()
    console.log(`play ${klank} message ${message}`);

    /*switch(message) {
        //klinkers
        case i:
            let klank = new Audio('/sound/i.mp3')
            klank.play()
            break;
        case o:
            let klank = new Audio('/sound/o.mp3')
            klank.play()
            break;
        case u:
            break;
        case a:
            break;
        case e:
            break;
        //lange klinkers
        case oo:
            break;
        case uu:
            break;
        case aa:
            break;
        case ee:
        //overige klinkers
            break;
        case oe:
            break;
        case ou:
            break;
        case ei:
            break;
        case au:
            break;
        case ie:
            break;
        case eu:
            break;
        case ui:
            break;
        case ij:
            break;
        //medeklinkers
        case b:
            break;
        case d:
            break;
        case f:
            break;
        case g:
            break;
        case h:
            break;
        case j:
            break;
        case k:
            break;
        case l:
            break;
        case m:
            break;
        case n:
            break;
        case p:
            break;
        case r:
            break;
        case s:
            break;
        case t:
            break;
        case v:
            break;
        case w:
            break;
        case z:
            break;
        //uitzonderingen
        case ng:
            break;
        case ch:
            break;
    }*/

}


document.getElementById('permissionButton').addEventListener('click', nfcHandler);
document.getElementById('writeButton').addEventListener('click', writenfc);
