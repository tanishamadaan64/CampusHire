import Cookies from 'universal-cookie';
const cookies = new Cookies();
export const isStudent = () => {
    const role_id = 2;
    const user = isAuthenticated();
    if(!user) return false;
    return user.role_id == role_id;
}

export const isAuthenticated = () => {
    const user = cookies.get('user');
    if(!user || user == undefined) {
        return false;
    }
    return user;
}

export const logout = () => {
    cookies.remove('user', {path: '/'});
}