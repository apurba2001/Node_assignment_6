const router = require('express').Router();
const Blog = require('../models/Blog')

router.get('/blog', async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const search = req.query.search
    try {
        const result = await Blog.find({ topic: search }).skip((page - 1) * 5).limit(5)
        res.json({
            status: "success",
            page: page,
            result: result.length ? result : `No data in page no: ${page}`
        })
    } catch (e) {
        res.json({
            status: "failed",
            message: e.message
        })
    }
})

router.post('/blog', async (req, res) => {
    const data = req.body
    try {
        const result = await Blog.create(data)
        res.json(result)
    } catch (e) {
        res.json({
            status: 'failed',
            message: e.message
        })
    }
})

router.put('/blog/:id', async (req, res) => {
    const id = req.params.id
    const data = req.body
    try {
        await Blog.updateOne({ _id: id }, data)
        const result = await Blog.find({ _id: id })
        res.json(result)
    } catch (e) {
        res.json({
            status: 'failed',
            message: e.message
        })
    }
})

router.delete('/blog/:id', async (req, res) => {
    const id = req.params.id
    try {
        const result = await Blog.find({ _id: id })
        await Blog.deleteOne({ _id: id })
        res.json(result)
    } catch (e) {
        res.json({
            status: 'failed',
            message: e.message
        })
    }
})

module.exports = router