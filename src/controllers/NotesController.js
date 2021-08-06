const Note = require('./../models/Note');
class NoteController {
  addNote = async (req,res,next) => {
    try {
      if(new Date(req.body.onDate) <= new Date()) return res.status(403).send({error:'Past dates cannot be added'});       
      const note = {
        content: req.body.content,
        status:req.body.status,
        onDate: req.body.onDate
      };
      const newNote = await Note.create(req.body);
      return res.status(201).send({message:'Note added Successfully',note:newNote});
      } catch(error) { 
      next(error);
      }
  }
 
}

module.exports = NoteController;