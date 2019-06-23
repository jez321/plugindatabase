export const findByDataTestAttrVal = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`)
}