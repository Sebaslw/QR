const qrInput = document.getElementById("qr-input");
const qrImg = document.getElementById("qr-img");
const downloadBtn = document.getElementById("descarga");

const wifiSsid = document.getElementById("ssid");
const wifiPassword = document.getElementById("password");
const wifiQrCode = document.getElementById("wifi-qrcode");
const errorMessage = document.getElementById("error-message");
const wifiDownloadBtn = document.getElementById("wifi-download-btn");

// Tabs
function openTab(tabName, el){
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.content').forEach(c=>c.classList.remove('active'));

    el.classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

// QR normal
function generateStandardQR(){
    const value = qrInput.value.trim();
    if(!value) return;

    QRCode.toDataURL(value, {width:200}, (err, url)=>{
        if(err) return console.error(err);
        qrImg.src = url;
    });
}

// Descargar QR normal
downloadBtn.addEventListener("click", ()=>{
    if(!qrImg.src) return;

    const a = document.createElement("a");
    a.href = qrImg.src;
    a.download = "qr-code.png";
    a.click();
});

// QR WiFi
function generateWifiQR(){
    const ssid = wifiSsid.value.trim();
    const pass = wifiPassword.value.trim();

    if(!ssid || !pass){
        errorMessage.style.display = "block";
        return;
    }

    errorMessage.style.display = "none";

    const wifiString = `WIFI:T:WPA;S:${ssid};P:${pass};;`;

    QRCode.toDataURL(wifiString, {width:200}, (err, url)=>{
        if(err) return console.error(err);

        wifiQrCode.innerHTML = `<img src="${url}">`;
        wifiDownloadBtn.dataset.url = url;
    });
}

// Descargar QR WiFi
wifiDownloadBtn.addEventListener("click", ()=>{
    const url = wifiDownloadBtn.dataset.url;
    if(!url) return;

    const a = document.createElement("a");
    a.href = url;
    a.download = "wifi-qr.png";
    a.click();
});