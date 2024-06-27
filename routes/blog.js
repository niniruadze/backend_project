    const express = require('express')
    const router = express.Router()
    const blogService = require('../services/blogService')

    router.get('/all', blogService.getAll);
    router.get('/:id', blogService.getById);
    router.post('/add', blogService.add);
    router.put('/:id', blogService.update);
    router.delete('/:id', blogService.delete);

    router.post('/:id/comments',blogService.addComment);
    router.delete('/:blogId/comments/:commentId',blogService.removeComment);

    module.exports = router;