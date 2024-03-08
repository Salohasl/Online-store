const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => res.send('Get all img'))
router.get('/:id', (req, res) => res.send('Get singe img'))
router.get('/', (req, res) => res.send('create img'))

module.exports = router;