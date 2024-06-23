document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const masterPassword = document.getElementById('master-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
  
    if (masterPassword !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
  
    const hashedPassword = CryptoJS.SHA256(masterPassword).toString();
    chrome.storage.sync.set({ masterPasswordHash: hashedPassword, authenticated: true }, function () {
      alert("Master password set successfully.");
      window.location.href = "../popup/index.html";
    });
  });
  