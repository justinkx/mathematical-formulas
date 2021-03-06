const Categories = require('../models/Categories');
const roleService = require('./roleService');

async function getCategories() {
    return await Categories.find();
}

async function createCategory(categoryParams,uid) {
    const role = await roleService.findUserRole(uid);
    if (!role.isAdmin) {
        throw `You Don't Have Admin Access`;
    }
    if (await Categories.findOne({ name: categoryParams.name })) {
        throw `Name ${categoryParams.name} is already taken. Try new name`;
    }
    const newCategory = new Categories(categoryParams);
    return await newCategory.save();
}

async function updateCategory(categoryId,param,uid) {
    const role = await roleService.findUserRole(uid);
    if (!role.isAdmin) {
        throw `You Don't Have Admin Access`;
    }
    const Category = await Categories.findById(categoryId);
    if (!Category) throw `Category ${categoryId} not found`;
    Object.assign(Category,param);
    return await Category.save();
}
async function deleteCategory(categoryId) {
    return await Categories.deleteOne({_id: categoryId});
}
module.exports = {
	getCategories,
	createCategory,
    updateCategory,
    deleteCategory
};