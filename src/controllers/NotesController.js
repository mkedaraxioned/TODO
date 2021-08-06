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

  getNotes = async (req,res,next) => {
    try {
      const notes = await Note.find({user:res.locals.userEmail},{__v:0});
      if(!notes) return res.status(404).send({ error:'No notes found' });
      return res.status(200).send({notes});
    } catch (error) {
      next(error);
    }
  }

  updateNote = async (req,res,next) => {
    try {
      const note = await Note.find({_id:req.params.id});
      let accessGranted = false;
      let statusOld,onDateOld;
      note.forEach((noteData,i) => {
        statusOld = noteData.status;
        onDateOld = noteData.onDate;
        if(noteData.user == res.locals.userEmail) accessGranted = true;    
       });
      if(!note) return res.status(404).send({ error:'Note was not found' });
      if(accessGranted) {         
        if(req.body.content) return res.status(403).send({error:'Note content cannot be changed'});
        if(new Date(req.body.onDate) <= new Date()) return res.status(403).send({error:'Past dates cannot be added'});      
      const updateData = {
        status:req.body.status ? req.body.status : statusOld,
        onDate: req.body.onDate ? req.body.onDate : onDateOld
      }
      const updatedNote = await Note.findByIdAndUpdate(req.params.id , updateData,{
        new : true,
        runValidators:true,
        useFindAndModify:false
      });
      if(!updatedNote) return res.status(500).send({ error:'Internal server error' });  
      return res.status(200).send({msg:'Note updated',updatedNote});
    }
     else {
      return res.status(401).send({error: 'Unauthorized Access denied'});
    }
    } catch (error) {
      next(error);
    }
  }
 
}

module.exports = NoteController;