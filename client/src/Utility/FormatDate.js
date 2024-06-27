

// account creation date 
export const formatDate = (dateString) => {
    const format = {year: 'numeric', month: 'long'}
    return new Date(dateString).toLocaleDateString(undefined, format)
}