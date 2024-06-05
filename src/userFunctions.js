function getUserData(users, username) {
    const userId = parseInt(username.match(/\d+/g))
    const userInfo = users.find(user => {
        return user.id === userId
    })
    console.log("userId:", userId)
    console.log("userInfo:", userInfo)
    return userInfo
}
export {
    getUserData,
}