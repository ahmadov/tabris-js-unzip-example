const worker = new Worker('script/worker.js');

worker.onmessage = (event) => {
  event.data.forEach(({path, contents}) => {
    console.log('Path:\n', path, '\nContents:\n', contents, '\n')
  });
  worker.terminate();
}
worker.onerror = (error) => {
  console.error(error);
  worker.terminate();
}

worker.postMessage({url: 'https://tabris.com/wp-content/uploads/2020/07/zipfile.zip'});
