let UserProfile  =(function() {
    let username = '';
    let connected = false;

    const getUsername = () => {
        return username;
    };

    const setUsername = function(value){
        username = value;
    };

    const getConnected = () => {
        return connected;
    }

    const setConnected = (value) => {
        connected = value;
    }

    return {
        getUsername: getUsername,
        setUsername: setUsername,
        getConnected: getConnected,
        setConnected: setConnected
    }
})();

export default UserProfile;