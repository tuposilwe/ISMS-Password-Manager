(async function() {
    const { userData } = await chrome.storage.local.get("userData");
    if (userData) {
        console.log("Autofilling username and password");

        const usernameInput = document.querySelector('input[type="text"]'); 
        const passwordInput = document.querySelector('input[type="password"]'); 

        if (usernameInput && passwordInput) {
            usernameInput.value = userData.username;
            passwordInput.value = userData.password;
        } else {
             console.log("Input fields not found");
        }
    } else {
         console.log("No data found");
    }
})();