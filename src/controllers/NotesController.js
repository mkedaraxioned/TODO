const Note = require('./../models/Note');
class NoteController {
  addNote = async (req,res,next) => {
    try {
      if(new Date(req.body.onDate) <= new Date()) return res.status(403).send({error:'Please enter a valid date'});       
      const note = {
        content: req.body.content,
        status:req.body.status,
        onDate: req.body.onDate,
        user: res.locals.userEmail
      };
      const newNote = await Note.create(note);
      return res.status(201).send({message:'Note added Successfully',note:newNote});
      } catch(error) { 
      next(error);
      }
  }
 
}

module.exports = NoteController;