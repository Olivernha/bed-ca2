const express = require('express');
const router = express.Router();
const questController = require('../controllers/questController');

router.get('/', questController.readAllQuests);
router.post('/', questController.createNewQuest, questController.readQuestById);

router.get('/:quest_id', questController.readQuestById);
router.put('/:quest_id', questController.updateQuestById, questController.readQuestById);
router.delete('/:quest_id', questController.deleteQuestById);




module.exports = router;