export const getSubCategory = async (subcategory) => {
    const data = {
        subCategoryId: subcategory,
    };
    try {
        const res = await axios.post(`/product/getProductsBySubCategory`, data)
        return res.data.data
    } catch (error) {
        console.log("error", error)
    }
}
