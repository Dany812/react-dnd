export function saveData(url, data) {
  return new Promise((success, fail) => {
    const request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader('Content-type', 'application/json');
    request.addEventListener('load', () => {
      request.status >= 200 && request.status < 400
        ? success(JSON.parse(request.response))
        : fail(new Error(`Request Failed: ${request.statusText}`));
    });
    request.addEventListener('error', () => {
      fail(new Error('Network Error'));
    });
    const file = {name: 'Danil', data: data };
    request.send(JSON.stringify(file));
  });
}