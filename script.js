const fileName = window.location.pathname.split("/").pop() || "index.html";
const pageUrl = window.location.href;

let namePart = fileName.includes("_")
    ? fileName.split("_")[1].replace(".html", "")
    : fileName.replace(".html", "");

const now = new Date();
const dateString = now.toLocaleDateString("pl-PL");

let historia108 = JSON.parse(localStorage.getItem("historia108")) || [];

historia108 = historia108.filter(item => item.file !== fileName);

historia108.push({
    file: fileName,
    name: namePart,
    url: pageUrl,
    date: dateString
});

if (historia108.length > 100) {
    historia108 = historia108.slice(historia108.length - 100);
}

localStorage.setItem("historia108", JSON.stringify(historia108));


function numerateTables() {
    // Numeracja wierszy w tabelach bez klasy "nienumerowana"
    document.querySelectorAll("table:not(.nienumerowana)").forEach(table => {
        let rows = table.querySelectorAll("tr:not(:first-child)");
        rows.forEach((row, index) => {
            let firstCell = row.querySelector("td:first-child");
            if (firstCell) {
                firstCell.textContent = index + 1;
            }
        });
    });
}

window.onload = function() {
    numerateTables();

    // Motyw ciemny jeśli systemowy
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    }

    // Szukanie nagłówka <h1 id="naglowek">
    const naglowek = document.getElementById("naglowek");
    if (naglowek) {
        const tekst = naglowek.textContent;
        const pasujacyTekst = tekst.match(/^(.*)\(\d*\/(\d+)\)$/); // np. "Korona Gór Polski (0/28)"

        if (pasujacyTekst) {
            const nazwa = pasujacyTekst[1].trim(); // np. "Korona Gór Polski"
            const calkowitaLiczba = parseInt(pasujacyTekst[2]); // np. 28

            const zieloneWiersze = document.querySelectorAll('tr[style="background-color: #90ee90;"]');
            const liczbaZdobytych = zieloneWiersze.length;

            naglowek.textContent = `${nazwa} (${liczbaZdobytych}/${calkowitaLiczba})`;
        }
    }
};
