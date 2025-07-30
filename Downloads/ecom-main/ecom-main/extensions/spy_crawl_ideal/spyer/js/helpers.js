function parseHTML(html) {
  let t = document.createElement('template');
  t.innerHTML = html;
  return t.content.cloneNode(true);
}

// Function để inject CSS trực tiếp
function injectCSS() {
  const cssContent = `
.exp-template {
  position: fixed;
  bottom: calc(50%);
  right: 10px;
  z-index: 9999;
  text-align: center;
  padding: 10px;
  font-size: 13px;
}

.exp-input {
  padding: 0px 5px;
  margin: 5px auto !important;
  display: block;
  border: 1px solid #ccc;
  line-height: 1rem;
  height: 2.5rem;
  color: #0c0c0c;
}

.exp-select {
  padding: 0px 5px;
  margin: 5px auto !important;
  display: block;
  border: 1px solid #ccc;
  line-height: 1rem;
  height: 2.5rem;
  color: #0c0c0c;
}

.exp-btn {
  display: block;
  padding: 10px 10px 20px 10px;
  padding: 5px 10px;
  background: #4F46E5;
  opacity: 0.7;
  outline: 0;
  font-weight: 600;
  color: white;
  border: 1px solid #4F46E5;
  line-height: 1rem;
  height: 2.5rem;
  border-radius: 5px;
}

.exp-btn:hover {
  opacity: 1;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.exp-btn.is-loading:after {}

.exp-btn.is-loading {
  position: relative;
  color: transparent !important;
}

.exp-btn.is-loading:after {
  position: absolute;
  left: calc(50% - 1rem);
  bottom: calc(50% - 1rem);
  content: "";
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  animation: 1s spin linear infinite;
  border: 3px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  background: transparent;
}

.exp-spy-snackbar {
  visibility: hidden;
  min-width: 300px;
  max-width: 400px;
  margin-left: -150px;
  color: #fff;
  text-align: center;
  border-radius: 8px;
  padding: 16px 20px;
  position: fixed;
  z-index: 10000;
  left: 50%;
  bottom: 30px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transform: translateY(100px);
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.exp-spy-snackbar.show {
  visibility: visible;
  transform: translateY(0);
  opacity: 1;
}

.exp-spy-snackbar.show.success {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  border-color: rgba(76, 175, 80, 0.3);
}

.exp-spy-snackbar.show.error {
  background: linear-gradient(135deg, #f44336, #d32f2f);
  color: white;
  border-color: rgba(244, 67, 54, 0.3);
}

.exp-spy-snackbar.show.info {
  background: linear-gradient(135deg, #2196F3, #1976D2);
  color: white;
  border-color: rgba(33, 150, 243, 0.3);
}

.exp-spy-snackbar.show.warning {
  background: linear-gradient(135deg, #ff9800, #f57c00);
  color: white;
  border-color: rgba(255, 152, 0, 0.3);
}

.exp-spy-snackbar:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.exp-spy-snackbar::before {
  content: '';
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  vertical-align: middle;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.exp-spy-snackbar.show.success::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/%3E%3C/svg%3E");
}

.exp-spy-snackbar.show.error::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E");
}

.exp-spy-snackbar.show.info::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z'/%3E%3C/svg%3E");
}

.exp-spy-snackbar.show.warning::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z'/%3E%3C/svg%3E");
}

@media (max-width: 768px) {
  .exp-spy-snackbar {
    min-width: 280px;
    max-width: 320px;
    margin-left: -140px;
    font-size: 13px;
    padding: 14px 16px;
  }
}

@media (max-width: 480px) {
  .exp-spy-snackbar {
    min-width: 260px;
    max-width: 300px;
    margin-left: -130px;
    font-size: 12px;
    padding: 12px 14px;
    bottom: 20px;
  }
}
  `;

  // Kiểm tra xem CSS đã được inject chưa
  const existingStyle = document.querySelector('style[data-extension-css]');
  if (!existingStyle) {
    const style = document.createElement('style');
    style.setAttribute('data-extension-css', 'true');
    style.textContent = cssContent;
    document.head.appendChild(style);
    console.log('CSS injected successfully');
  } else {
    console.log('CSS already injected');
  }
}

// Auto inject CSS khi file được load
injectCSS();

function expToast(type, msg) {
  console.log(type, msg);

  // Đảm bảo CSS đã được inject
  injectCSS();

  let x = document.getElementById("exp-spy-snackbar");

  // Chỉ thêm toast nếu element đã tồn tại
  if (x) {
    x.innerText = msg;
    x.className = "exp-spy-snackbar show " + type;
    setTimeout(function () { x.className = "exp-spy-snackbar"; }, 3000);
  } else {
    console.error('Toast element not found. Please create element with id="exp-spy-snackbar"');
  }
}