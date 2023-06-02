import fs from 'fs-extra';
import path from 'path';
import util from 'util';
import { approotdir } from './approotdir.mjs';
import { Note, AbstractNoteStore } from './Notes.mjs';
import { default as DBG } from 'debug';
const debug = DBG('exprap266:notes-fs');
const error = DBG('notes:error-fs');


export default class FSNoteStore extends AbstractNotesStore {
  async close() { }
  async update(key, title, body) { return crupdate(key, title, body);
  }
  async create(key, title, body) { return crupdate(key, title, body); 
  }
  async read(key) {
    const notesdir = await notesDir();
    const thenote = await readJSON(notesdir, key);
    return thenote;
  }

}