function nfcHandler()
{
    if ('NDEFReader' in window) {
        /* Scan and write NFC tags */

        const ndef = new NDEFReader();
        ndef.scan().then(() => {
            console.log("Scan started successfully.");
            ndef.onreadingerror = () => {
                console.log("Cannot read data from the NFC tag. Try another one?");
            };
            ndef.onreading = event => {
                console.log("NDEF message read.");
            };
        }).catch(error => {
            console.log(`Error! Scan failed to start: ${error}.`);
        });
    }
}

document.getElementById('nfc-button').addEventListener('click', nfcHandler);
