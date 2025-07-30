import env_variables from '../config.js'
document.addEventListener('DOMContentLoaded', function () {
  const loginContainer = document.querySelector('.login-container');
  const welcomeMessage = document.querySelector('.welcome-message');
  loginContainer.style.display = 'none';
  // Check if token exists in chrome storage
  chrome.storage.local.get(['session'], function (result) {    
    if (result.session && result.session.user) {
      const user = result.session.user;
      welcomeMessage.innerHTML = `Xin chào <span style="font-weight: bold;">${user.name || 'User'}</span>,<br> Truy cập các trang etsy, woo, shopify để xem sản phẩm.<br> Nếu cần thêm nguồn nào, đừng ngần ngại liên hệ với đội kỹ thuật.`;
    } else {
      loginContainer.style.display = 'block';
    }
  });

  document.getElementById('login-button').addEventListener('click', function () {
    chrome.tabs.create({ url: env_variables().api_app }, (tab) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["assets/content.js"]
      });
    });
  });
});