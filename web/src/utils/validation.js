/**
 * validation name
 */
export const validationName = (name) => {
    return String(name)
        .toLowerCase()
        .match(
            /^[a-z][a-z\s]*$/
        );
};

export const validationPhone = (name) => {
    return String(name)
        .toLowerCase()
        .match(
            /^\d{10}$/
        );
};
