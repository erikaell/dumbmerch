const { category } = require("../../models");

// Add new category
exports.addCategory = async (req, res) => {
    try {

        await category.create(req.body)

        res.send({
            status: 'success',
            message: 'Add category finished'
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

// Fetch all categories
exports.getAllCategories = async (req, res) => {
    try {

        const categoriesData = await category.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'success',
            categories: categoriesData
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

// Fetch category by id
exports.getCategory = async (req, res) => {
    try {
        const { id } = req.params

        const categoryData = await category.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'success',
            category: categoryData
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

// Update category by id
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params

        await category.update(req.body, {
            where: {
                id
            }
        })

        const categoryData = await category.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'success',
            message: `Update category id: ${id} finished`,
            data: {
                category: categoryData
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

// Detele category by id
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params

        await category.destroy({
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            message: `Delete category id: ${id} finished`
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}