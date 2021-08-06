const express = require('express');
const userRoutes = require('./userRoutes');
const noteRoutes = require('./noteRoutes');
const router = express.Router({ mergeParams:true });
router.use('/user',userRoutes);
router.use('/note',noteRoutes);
router.use((req, res, next) => {
  return res.status(500).send({error: 'Internal Server error'});
});

module.exports = router;