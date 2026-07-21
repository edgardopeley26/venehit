const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode");

console.log("🚀 INICIO GENERADOR QR");

const filePath = path.join(__dirname, "..", "canciones.json");

const canciones = JSON.parse(fs.readFileSync(filePath, "utf8"));

console.log("🎵 Canciones:", canciones.length);

const outputDir = path.join(__dirname, "..", "qr");

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
    console.log("📁 carpeta qr creada");
}

for (const c of canciones) {

    console.log("➡️ generando:", c.id);

    const url = `https://edgardopeley26.github.io/venehit/?id=${c.id}`;


    QRCode.toFile(
        path.join(outputDir, `${c.id}.png`),
        url,
        { width: 500 },
        (err) => {
            if (err) {
                console.log("❌ ERROR:", err);
            } else {
                console.log("✔️ OK:", c.id);
            }
        }
    );
}

console.log("🏁 FIN DEL SCRIPT");
