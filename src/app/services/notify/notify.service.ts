import { map, filter } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Notify } from 'src/app/models/notify';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { equal } from 'assert';


@Injectable({
  providedIn: 'root'
})
export class NotifyService {
    private notifySource = new BehaviorSubject({ notify: null, key: ''});
    currentNotify = this.notifySource.asObservable();


  constructor( private db: AngularFireDatabase ) { }

  changeNotify(notify: Notify, key: string) {
      this.notifySource.next({ notify: notify, key: key });
  }

  update(notify: Notify, key: string) {
    this.db.list('notifications').update(key, notify)
    .catch((error: any) => {
        console.error(error);
    });
  }

  getAll(userid) {
    function msgUser (value) {
      if (value.user === userid) {
      return value;
      }
  }

    return this.db.list('notifications')
    .snapshotChanges()
    .pipe(
        map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {}})).filter(msgUser);
        })
    );
  }

  delete(key: string ) {
    this.db.object(`notifications/${key}`).remove();
  }
}
