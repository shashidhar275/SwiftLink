//The problem here is whenever we restart the server map will become empty!!
const sessionIdToUserMap = new Map();

function setUser(id,user){
    sessionIdToUserMap.set(id,user);
}

function getUser(id){
    return sessionIdToUserMap.get(id);
}

module.exports = { setUser , getUser };