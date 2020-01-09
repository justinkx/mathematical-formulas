const Categories = require('../models/Categories');

async function getCategories() {
    return await Categories.find()
}

async function createCategory(categoryParams) {
    const newCategory = new Categories(categoryParams);
    await newCategory.save();
}

async function updateCategory(categoryId,name) {
    const Category = await Categories.findById(categoryId);
    Category.name = name;
    await Category.save();
}
module.exports = {
	getCategories,
	createCategory,
	updateCategory
};