const express = require('express');
const router = express.Router();
const magicItemController = require('../controllers/itemController');

router.get('/', magicItemController.readAllMagicItems);
router.post('/', magicItemController.createNewMagicItem, magicItemController.readMagicItemById);
router.get('/:magic_item_id', magicItemController.readMagicItemById);
router.put('/:magic_item_id', magicItemController.updateMagicItemById, magicItemController.readMagicItemById);
router.delete('/:magic_item_id', magicItemController.deleteMagicItemById);

module.exports = router;