export default () => {
    const saveItems = (key, item) => localStorage.setItem(key, JSON.stringify(item));
    const getSavedItems = (key) => JSON.parse(localStorage.getItem(key))
    const removeSavedItems = (key) => localStorage.remove(key)

    return {
        saveItems,
        getSavedItems,
        removeSavedItems
    }
}