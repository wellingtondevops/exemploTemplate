import { map, filter } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Notify } from 'src/app/models/notify';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { equal } from 'assert';
import * as firebase from 'firebase';



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

    update(key: string) {
        this.db.object(`notifications/${key}`).update({'active': false});
    }

    updateMail(key: string) {
        this.db.object(`notifications/${key}`).update({'active': false});
    }

    getAll(userid) {
        function msgUser (value) {
            if (value.user === userid) {
                return value;
            }
        }
        return this.db.list('notifications').snapshotChanges().pipe(
            map(changes => {
                return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {}})).filter(msgUser);
            })
        );
    }

    getAllMail(userid) {
        function msgUser (value) {
            if (value.user === userid) {
                return value;
            }
        }
        return this.db.list('notifications').snapshotChanges().pipe(
            map(changes => {
                return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {}})).filter(msgUser);
            })
        );
    }
    getAllUpload(userid) {
        function msgUser (value) {
            if (value.user === userid) {
                return value;
            }
        }
        return this.db.list('notifications').snapshotChanges().pipe(
            map(changes => {
                return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {}})).filter(msgUser);
            })
        );
    }
    delete(key: string ) {
        this.db.object(`notifications/${key}`).remove();
    }

    deleteMail(key: string ) {
        this.db.object(`notifications/${key}`).remove();
    }


    getlength(userid) {
        function msgUser (value) {
            if (value.user === userid && value.active === true) {
                return value;
            }
        }
        return this.db.list('notifications').snapshotChanges().pipe(
            map(changes => {
                return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {}})).filter(msgUser).length;
            })
        );
    }


    getlengthMail(userid) {
        function msgUser (value) {
            if (value.user === userid && value.active === true) {
                return value;
            }
        }
        return this.db.list('notifications').snapshotChanges().pipe(
            map(changes => {
                return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {}})).filter(msgUser).length;
            })
        );
    }
    getlengthUpload(userid) {
        function msgUser (value) {
            if (value.user === userid && value.active === true) {
                return value;
            }
        }
        return this.db.list('notifications').snapshotChanges().pipe(
            map(changes => {
                return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {}})).filter(msgUser).length;
            })
        );
    }
}
