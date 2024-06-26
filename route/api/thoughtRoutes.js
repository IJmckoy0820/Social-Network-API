const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    DeleteReaction,
    addReaction,
} = require('../../controller/thoughtController');


// /api/thought
router.route('/').get(getThoughts).post(createThought);

// /api/thought/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);



// /api/thought/:thoughtId/reaction
router.route('/:thoughtId/reaction').post(addReaction).delete(DeleteReaction);


module.exports = router;
