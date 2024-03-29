import { Server, Model, RestSerializer } from "miragejs";
import {
  deleteFromArchivesHandler,
  getAllArchivedNotesHandler,
  restoreFromArchivesHandler,
  moveArchivedToTrashHandler,
  updateArchiveHandler,
} from "./backend/controllers/ArchiveController";
import {
  loginHandler,
  signupHandler,
} from "./backend/controllers/AuthController";
import {
  archiveNoteHandler,
  createNoteHandler,
  deleteNoteHandler,
  getAllNotesHandler,
  updateNoteHandler,
  moveNoteToTrashHandler,
} from "./backend/controllers/NotesController";
import {
  getAllTrashedNotesHandler,
  deleteFromTrashHandler,
  restoreFromTrashHandler,
} from "./backend/controllers/TrashController";
import { users } from "./backend/db/users";

export function makeServer({ environment = "development" } = {}) {
  const server = new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    // TODO: Use Relationships to have named relational Data
    models: {
      user: Model,
      notes: Model,
    },

    seeds(server) {
      server.logging = false;
      users.forEach((item) =>
        server.create("user", {
          ...item,
          notes: [],
          archives: [],
          trash: [],
        })
      );
    },

    routes() {
      this.namespace = "api";
      // auth routes (public)
      this.post("/auth/signup", signupHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));

      // notes routes (private)
      this.get("/notes", getAllNotesHandler.bind(this));
      this.post("/notes", createNoteHandler.bind(this));
      this.post("/notes/:noteId", updateNoteHandler.bind(this));
      this.delete("/notes/:noteId", deleteNoteHandler.bind(this));
      this.post("/notes/archives/:noteId", archiveNoteHandler.bind(this));
      this.post("/trash/delete/:noteId", moveNoteToTrashHandler.bind(this));
      // archive routes (private)
      this.get("/archives", getAllArchivedNotesHandler.bind(this));
      this.post(
        "/archives/restore/:noteId",
        restoreFromArchivesHandler.bind(this)
      );
      this.delete(
        "/archives/delete/:noteId",
        deleteFromArchivesHandler.bind(this)
      );
      this.post(
        "/archives/trash/:noteId",
        moveArchivedToTrashHandler.bind(this)
      );
      this.post("/archives/:noteId", updateArchiveHandler.bind(this));

      //  trash routes (private)
      this.post("/notes/trash/:noteId", moveNoteToTrashHandler.bind(this));
      this.get("/trash", getAllTrashedNotesHandler.bind(this));
      this.post("/trash/restore/:noteId", restoreFromTrashHandler.bind(this));
      this.delete("/trash/delete/:noteId", deleteFromTrashHandler.bind(this));
    },
  });
  return server;
}
