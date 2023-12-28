export const getFullName = (userToken) => {
    // Check if window is defined to ensure we are on the client side
    if (typeof window !== 'undefined' && window.localStorage && userToken) {
        if (userToken.firstName && userToken.lastName) {
            return `${userToken.firstName} ${userToken.lastName}`;
        }
    }
    return null;
};