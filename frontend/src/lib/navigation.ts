export const getRedirectPath = (role: string) : string => {
    switch (role) {
        case 'admin':
            return '/admin'
        case 'teacher':
            return '/teacher'
        case 'parent':
            return '/'
        default:
            return '/signin'
    }
}