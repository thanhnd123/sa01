document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.local.get(['dataUser'], function (result) {
    if (result.dataUser) {
      const expFormSubmit = document.querySelector('form#exp-form-submit-user');
      if (expFormSubmit) {
        expFormSubmit.querySelector('input#token').value = result.dataUser.token || '';
        expFormSubmit.querySelector('small#exp-small-result-message').innerHTML =
          `<span style="color: red">Welcome ${result.dataUser.role} ${result.dataUser.name} team ${result.dataUser.team} Login!</span>`;
      }
    }
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'update_login_status' && request.data) {
    const expFormSubmit = document.querySelector('form#exp-form-submit-user');
    if (expFormSubmit) {
      expFormSubmit.querySelector('input#token').value = request.data.token || '';
      expFormSubmit.querySelector('small#exp-small-result-message').innerHTML = 
        `<span style="color: red">Welcome ${request.data.role} ${request.data.name} team ${request.data.team} Login!</span>`;
    }
  }
});

let alertMessage = (text) => {
  console.log(text + ' please alert with @ryotaru!');
};

let submitFormExpLogin = async (request) => {
  let fetchApi = await fetch(request.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token_user: request.userToken })
  });

  let convertJson = await fetchApi.json();

  let response = await convertJson.result;

  return response;
};

let expFormSubmit = document.querySelector('form#exp-form-submit-user');
if (expFormSubmit) {
  expFormSubmit.addEventListener('submit', async (event) => {
    event.preventDefault();

    let apiUrl = expFormSubmit.querySelector('select#host').value;
    let userToken = expFormSubmit.querySelector('input#token').value;

    if (apiUrl && userToken) {
      let response = await submitFormExpLogin({ apiUrl: apiUrl + '/users/show', userToken: userToken });

      if (await response == 'User not found') {
        chrome.runtime.sendMessage({ action: 'alertMessage', message: await response })
      } else {
        expFormSubmit.querySelector('input#token').value = userToken;
        expFormSubmit.querySelector('small#exp-small-result-message').innerHTML = `<span style="color: red">Welcome ${await response.role} ${await response.name} team ${await response.team} Login!</span>`;

        chrome.storage.local.set({ dataUser: await response }, function () {
          console.log('save');
        });

        chrome.runtime.sendMessage({ action: 'user_login_token_success', data: await response })
      }

      console.log(await response);
    } else {
      alertMessage('Api url or token user exp not found')
    }
  });
} else {
  alertMessage('Form exp submit user not found');
}