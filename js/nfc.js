
/*
Promise.all([
    navigator.permissions.query({ name: "nfc" }),
  ])
  .then(([{ state: nfcState }]) => {
    console.log("Geolocation permission state is:", nfcState);
    document.getElementById("bdy").innerHTML += "Nfc permission state: "+nfcState;
  });

*/
const ndef = new NDEFReader();
         
async function startScanning(){

    if ("NDEFReader" in window) {
        
        await ndef.scan();
        ndef.onreading = event => {
            console.log("testing ");
            console.log(event);
        }
        /* Scan and write NDEF Tags */ 
        document.getElementById("bdy").innerHTML += " NDEFReader is in window";
        //readnfc();
        
    }
    else{
        document.getElementById("bdy").innerHTML += "NDEFReader is not in window";
    }
}

const nfcPermissionStatus = await navigator.permissions.query({ name: "nfc" });
if (nfcPermissionStatus.state === "granted") {
  // NFC access was previously granted, so we can start NFC scanning now.
  startScanning();
}




function readnfc()
{
    read().then(({ serialNumber }) => {
        document.getElementById("bdy").innerHTML += serialNumber;
    });
}

function read() {
    return new Promise((resolve, reject) => {
        const ctlr = new AbortController();
        ctlr.signal.onabort = reject;
        ndef.addEventListener("reading", event => {
            ctlr.abort();
            resolve(event);
        }, { once: true });
        ndef.scan({ signal: ctlr.signal }).catch(err => reject(err));
    });
}