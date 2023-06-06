export const getFilteredItems = (items,searchTerm,filteredItem) => items.filter((item) => {
    const nameMatches = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatches = item.status.toLowerCase().includes(filteredItem.toLowerCase());
    if (searchTerm === "" && filteredItem === "all") {
        return true; // no search or filter applied
    }
    if (searchTerm !== "" && !nameMatches) {
        return false; // search term doesn't match name
    }
    if (filteredItem !== "all" && !statusMatches) {
        return false; // status value doesn't match filter
    }
    return true; // item matches search and filter criteria
});