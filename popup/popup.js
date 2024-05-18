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
});


async function storeData(data){
    await chrome.storage.local.set({ userData: { username: data.username, password: data.password } },
    function(){
        console.log('Data stored:', data);
    });
}


function notifyUser(message) {
    chrome.notifications.create('passwordSave7', {
        type: 'basic',
        iconUrl: 'hi.png',
        title: 'ISMS Password Manager',
        message: message,
        priority: 1
    }, function(notificationId) {
        console.log('Notification shown with ID:', notificationId);
    });
}

