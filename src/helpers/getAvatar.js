

export const getAvatar = (email) => {
    const array = email.split('');
    const first = array[0].charCodeAT(0) - 65;
    return String(first)[0];
}