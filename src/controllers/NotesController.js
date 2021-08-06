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

  getNotes = async (req,res,next) => {
    try {
      const notes = await Note.find({},{__v:0});
      return res.status(200).send({notes});
    } catch (error) {
      next(error);
    }
  }

  updateNote = async (req,res,next) => {
    try {
      const note = await Note.findById(req.params.id);
      if(!note) return res.status(404).send({ error:'Note was not found' });
      if(req.body.content) return res.status(403).send({error:'Note content cannot be changed'});
      if(new Date(req.body.onDate) <= new Date()) return res.status(403).send({error:'Past dates cannot be added'});      
      const updateData = {
        status:req.body.status ? req.body.status : note.status,
        onDate: req.body.onDate ? req.body.onDate : note.onDate
      }
      const updatedNote = await Note.findByIdAndUpdate(req.params.id , updateData,{
          new : true,
          runValidators:true,
          useFindAndModify:false
        });
      if(!updatedNote) return res.status(500).send({ error:'Internal server error' });  
      return res.status(200).send({msg:'Note updated',updatedNote});
    } catch (error) {
      next(error);
    }
  }

  deleteNote = async (req,res,next) => {
    try {
      const note = await Note.findByIdAndDelete(req.params.id);
      if(!note) return res.status(404).send({ message:'Note was not found' });
      return res.send({msg:'Note successfully deleted'});
    } catch (error) {
      next(error);
    }
  }
 
}

module.exports = NoteController;