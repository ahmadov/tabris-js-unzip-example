const JSZip = require('jszip');

onmessage = (e) => {
  downloadAndExtractZipFile(e.data.url)
    .then(files => postMessage(files))
    .catch(error => console.error(error));
}

async function downloadAndExtractZipFile(url) {
  const response = await fetch(url);
  const archive = await response.arrayBuffer();

  const result = (await JSZip.loadAsync(archive)).filter((path, entry) => !entry.dir);

  const files = [];
  for (const file of result) {
    const contents = await file.async('text');
    files.push({path: file.name, contents});
  }
  return files;
}
