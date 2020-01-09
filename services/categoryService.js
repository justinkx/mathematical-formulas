const Categories = require('../models/Categories');

async function getCategories() {
    return await Categories.find()
}

async function createCategory(categoryParams) {
    if (await Categories.findOne({ name: categoryParams.name })) {
        throw `Name ${categoryParams.name} is already taken. Try new name`;
    }
    const newCategory = new Categories(categoryParams);
    return await newCategory.save();
}

async function updateCategory(categoryId,param) {
    const Category = await Categories.findById(categoryId);
    if (!Category) throw `Category ?${categoryId} not found`;
    Category.name = param.name;
    return await Category.save();
}
module.exports = {
	getCategories,
	createCategory,
	updateCategory
};