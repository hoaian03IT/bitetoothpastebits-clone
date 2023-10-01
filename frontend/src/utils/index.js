function getError(error) {
    return error?.response?.data || error.message;
}

/* convert type "xxxx-xxxx" to "Xxxx Xxxx" */
function convertTypeToText(type) {
    const childItem = type.split("-");
    const array = childItem.map((item) => {
        item = item.charAt(0).toUpperCase() + item.slice(1);
        return item;
    });
    return array.join(" ");
}

export { getError, convertTypeToText };
