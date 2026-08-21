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


let id108 = localStorage.getItem("id108");

if (
    !id108 ||
    isNaN(id108)
) {
    id108 =
    Math.floor(Math.random() * 9999) + 1;

    localStorage.setItem(
        "id108",
        id108
    );

    console.log("Nowy numer:", id108);
} else {
    console.log("Numer:", id108);
}
