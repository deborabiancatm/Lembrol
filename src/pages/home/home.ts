import { Component } from '@angular/core';
import { NavController, NavParams,  ToastController} from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth"
import { AddNotePage } from '../add-note/add-notes';
import { NoteService } from '../../providers/note-service/note-service';
import { Note } from '../../models/note.model';
import { ViewNotePage } from '../view-note/view-note';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private notes : Promise<Note[]>;
  private note: Note;

  constructor(private afAuth: AngularFireAuth, private toast: ToastController,
    private noteService: NoteService,
    public navCtrl: NavController, public navParams: NavParams) {

  }
  ionViewWillEnter() {
    this.notes = this.getAllNotes();
  }

  addNote(){
    this.navCtrl.push(AddNotePage);
  }

  getNote(createDate: number) {
    this.noteService.getNote(createDate).then((n) => {
      this.note = n;
      this.navCtrl.push(ViewNotePage, { note: this.note })
    })
  }

  getAllNotes() {
    return this.noteService.getAllNotes();
  }


  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid){
        this.toast.create({
          message: 'Welcome to Lembrol, '+data.email,
          duration: 3000
        }).present();
      }else{
        this.toast.create({
          message: 'Could not find auth info',
          duration: 3000
        }).present();
      }
    });
  }
}
