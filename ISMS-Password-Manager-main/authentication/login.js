document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const masterPassword = document.getElementById('master-password').value;
  
    chrome.storage.sync.get(['masterPasswordHash'], function (data) {
      if (!data.masterPasswordHash) {
        window.location.href = "./register.html";
      } else {
        const enteredHash = CryptoJS.SHA256(masterPassword).toString();
        if (enteredHash === data.masterPasswordHash) {
          chrome.storage.sync.set({ authenticated: true }, function () {
            alert("Login successful!");
            window.location.href = "./popup.html";
          });
        } else {
          alert("Incorrect master password. Please try again.");
        }
      }
    });
  });
  