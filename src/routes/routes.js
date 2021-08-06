const express = require('express');
const userRoutes = require('./userRoutes');
const noteRoutes = require('./noteRoutes');
const router = express.Router({ mergeParams:true });
router.use('/user',userRoutes);
router.use('/note',noteRoutes);
module.exports = router;