

// account creation date 
export const formatDate = (dateString, viewType) => {
    const format = {year: 'numeric', month: 'long'}
    return new Date(dateString).toLocaleDateString(undefined, format)
}