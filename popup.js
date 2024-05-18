document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    const saveBtn = document.getElementById('saveBtn');
    const getBtn = document.getElementById('getBtn');

    saveBtn.addEventListener('click', function() {
        const username = usernameInput.value;
        const password = passwordInput.value;

        console.log("Username:", username);
        console.log("Password:", password);

        usernameInput.value ='';
        passwordInput.value='';

        storeData({ username, password });
         window.close();
    });

    getBtn.addEventListener('click', getPass);
});

async function storeData(data){
    await chrome.storage.local.set({ userData: { username: data.username, password: data.password } },
    function(){
        console.log('Data stored:', data);
    });
}

async function getPass() {
    const { userData } = await chrome.storage.session.get("userData");
    if (userData) {

        // alert(userData.username+" "+userData.password);
        
        console.log("Username:", userData.username);
        console.log("Password:", userData.password);
    } else {
        console.log("No data found");
    }
}



