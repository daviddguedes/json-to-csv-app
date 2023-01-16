function downloadCsv() {
  const txtArea = document.getElementById("json-to-csv");
  const blob = new Blob([txtArea.value], { type: 'text/csv;charset=utf-8,' });
  const objUrl = URL.createObjectURL(blob);

  const linkElement = document.getElementById("linkToDownload");
  linkElement.setAttribute('href', objUrl)
  linkElement.setAttribute('download', 'json-to-csv.csv')

  linkElement.click();
  linkElement.setAttribute('href', '')
}

function resetApp() {
  location.href = "/";
}

const btnDownloadCsv = document.getElementById("btnDownloadCsv");
if (btnDownloadCsv) {
  btnDownloadCsv.addEventListener('click', downloadCsv);
}

const btnReset = document.getElementById("btnReset");
btnReset.addEventListener('click', resetApp);