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

async function updateCategory(categoryId,name) {
    const Category = await Categories.findById(categoryId);
    Category.name = name;
    return await Category.save();
}
module.exports = {
	getCategories,
	createCategory,
	updateCategory
};