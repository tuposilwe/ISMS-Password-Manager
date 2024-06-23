let logoutTimer;

function setLogoutTimer() {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(logout, 60000); // 60,000 ms = 1 minute
}

function logout() {
    chrome.storage.sync.set({ authenticated: false }, function () {
        alert("You have been logged out due to inactivity.");
        window.location.href = "../authentication/login.html";
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    const saveBtn = document.getElementById('saveBtn');

    // Function to check if inputs are not empty and enable/disable saveBtn accordingly
    function checkInputs() {
        if (usernameInput.value.trim() === '' || passwordInput.value.trim() === '') {
            saveBtn.disabled = true;
        } else {
            saveBtn.disabled = false;
        }
    }

    // Initial check to disable button if inputs are empty
    checkInputs();

    // Add event listeners to input fields to check their values on input
    usernameInput.addEventListener('input', checkInputs);
    passwordInput.addEventListener('input', checkInputs);

    saveBtn.addEventListener('click', function() {
        const username = usernameInput.value;
        const password = passwordInput.value;

        console.log("Username:", username);
        console.log("Password:", password);

        usernameInput.value = '';
        passwordInput.value = '';

        storeData({ username, password });
        notifyUser("Credentials saved successfully!");
        window.close();
    });

    chrome.storage.sync.get(['authenticated'], function (data) {
      if (!data.authenticated) {
          window.location.href = "../authentication/login.html";
      } else {
          notifyUser("Login successfully!");
          setLogoutTimer(); // Start the logout timer after authentication
      }
  });

    document.body.addEventListener('mousemove', setLogoutTimer);
    document.body.addEventListener('keydown', setLogoutTimer);
    document.getElementById('logout-button').addEventListener('click', logout);
});


async function storeData(data){
    await chrome.storage.local.set({ userData: { username: data.username, password: data.password } },
    function(){
        console.log('Data stored:', data);
        setLogoutTimer();
    });
}


function notifyUser(message) {
    chrome.notifications.create('passwordSave9', {
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'ISMS Password Manager',
        message: message,
        priority: 1
    }, function(notificationId) {
        console.log('Notification shown with ID:', notificationId);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('generate-password').addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: "generatePassword" }, (response) => {
          const passwordElement = document.getElementById('generated-password');
          passwordElement.textContent = response.password;
        });
      });

    //   document.getElementById('check-password-strength').addEventListener('click', () => {
    //     const passwordInput = document.getElementById('password-input').value;
    //     const result = zxcvbn(passwordInput);
    //     document.getElementById('password-strength').textContent = `Strength score: ${result.score}`;
    //   });

    document.getElementById('check-password-strength').addEventListener('click', () => {
        const passwordInput = document.getElementById('password-input').value;
        const result = zxcvbn(passwordInput);
        const strengthText = document.getElementById('password-strength');
        const badge = document.getElementById('password-badge');
        
        let strengthMessage;
        let badgeClass;
      
        switch (result.score) {
          case 0:
          case 1:
            strengthMessage = 'Weak';
            badgeClass = 'badge-weak';
            break;
          case 2:
            strengthMessage = 'Fair';
            badgeClass = 'badge-fair';
            break;
          case 3:
            strengthMessage = 'Good';
            badgeClass = 'badge-good';
            break;
          case 4:
            strengthMessage = 'Strong';
            badgeClass = 'badge-strong';
            break;
          default:
            strengthMessage = 'Unknown';
            badgeClass = '';
        }
      
        strengthText.textContent = `Strength score: ${result.score} - ${strengthMessage}`;
        badge.textContent = strengthMessage;
        badge.className = `badge ${badgeClass}`;
      });
      
});



  

