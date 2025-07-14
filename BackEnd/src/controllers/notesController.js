import Note from "../models/Note.js";




export async function getNoteById (req, res) {
  try {
    const {id} = req.params;
    const note = await Note.findById(id);
    if(!note){
      return res.status(404).json({message: "Note not found"});
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("GetNoteByIderror",error);
    res.status(500).json({message: "Error getting note by id in controller"});
  }
}

export async function getNotes (req, res) {
    try {
        const notes = await Note.find().sort({createdAt: -1});//sorting the notes by createdAt in descending order
        res.status(200).json(notes);
    } catch (error) {
      console.error("GetNoteserror",error);
        res.status(500).json({message: error.message});
    }
  }

export async function createNote (req, res) {
    try {
        const {title, content} = req.body;
        const note = new Note({title, content});
        await note.save();
        res.status(201).json(note);
    } catch (error) {
      console.error("CreateNoteerror",error);
        res.status(500).json({message: "Error creating notei in controller"});
    }
  }

export async function updateNote (req, res) {
  try {
    const {id} = req.params;
    const {title, content} = req.body;
    const note = await Note.findByIdAndUpdate(id, {title, content}, {new: true});
    if(!note){
      return res.status(404).json({message: "Note not found"});
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("UpdateNoteerror",error);
    res.status(500).json({message: "Error updating note in controller"});
  }
}

export async function deleteNote (req, res) {
  try {
    const {id} = req.params;  
    const note = await Note.findByIdAndDelete(id);
    if(!note){
      return res.status(404).json({message: "Note not found"});
    }
    res.status(200).json({message: "Note deleted"});
  } catch (error) {
    console.error("DeleteNoteerror",error);
    res.status(500).json({message: "Error deleting note in controller"});
  }
}


