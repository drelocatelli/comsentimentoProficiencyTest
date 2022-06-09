export const hiddenPassword = (data) => {
    return data.filter(function(user) {
        delete user.password;
        return user;
    });
}