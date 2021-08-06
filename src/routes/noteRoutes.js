const express = require('express');
const router = express.Router({ mergeParams:true });
const NoteController = require('../controllers/NotesController');
const noteControllerObj = new NoteController();
const errorHandler = require('../middlewares/error');
// joi validation schemas
const schemas = require('../helpers/schema'); 
const validateData = require('../middlewares/validation');
const AuthMiddleware = require('./../middlewares/auth');
const auth = new AuthMiddleware();

router.route('/')
  .post(auth.authenticateToken,validateData(schemas.note),noteControllerObj.addNote,errorHandler)
  .get(auth.authenticateToken,noteControllerObj.getNotes,errorHandler);

router.route('/id/:id')
  .put(auth.authenticateToken,validateData(schemas.note),noteControllerObj.updateNote,errorHandler)
  .delete(auth.authenticateToken,noteControllerObj.deleteNote,errorHandler);  
module.exports = router;
