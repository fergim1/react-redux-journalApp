

export const retornarDocumentos = ( notesFirestore ) => {

    const notes= [];

    notesFirestore.forEach((note) => {
        notes.push({
          id: note.id,
          ...note.data(),
        });
      });
      return notes;
}