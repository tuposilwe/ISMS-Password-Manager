document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    const saveBtn = document.getElementById('saveBtn');

    // Load stored data when the options page is opened
    loadStoredData();

    saveBtn.addEventListener('click', function() {
        const password = passwordInput.value;

        if (password) {
            updatePassword(password);
            console.log('Password updated successfully!');
        } else {
            console.log('Please enter a new password.');
        }
    });

    async function loadStoredData() {
        const { userData } = await chrome.storage.local.get("userData");
        if (userData) {
            usernameInput.value = userData.username;
        } else {
            usernameInput.value = 'No username found';
        }
    }

    async function updatePassword(password) {
        const { userData } = await chrome.storage.local.get("userData");
        if (userData) {
            userData.password = password;
            await chrome.storage.local.set({ userData: userData }, function() {
                notifyUser("Password updated successfully!");
            });
        } else {
            console.log('No username found to update the password for');
        }
    }
});

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

