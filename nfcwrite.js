if ("NDEFReader" in window) {
    /* Scan and write NDEF Tags */ 
    document.getElementById("bdy").innerHTML = "NDEFReader is in window: writing nfc now";
    writenfc();
}
else{
   document.getElementById("bdy").innerHTML = "NDEFReader is not in window";
}

function writenfc()
{
    const ndef = new NDEFReader();
    ndef.write(
        "Hello Levi"
    ).then(() => {
        document.getElementById("bdy").innerHTML +=" Message written.";
    }).catch(error => {
        document.getElementById("bdy").innerHTML +=`Write failed :-( try again: ${error}.`;
    });
}