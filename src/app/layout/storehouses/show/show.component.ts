import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { routerTransition } from 'src/app/router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

const MODALS = {
    focusFirst: NgbdModalConfirmComponent
};
@Component({
    selector: 'app-show',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.scss'],
    animations: [routerTransition()]
})
export class ShowComponent implements OnInit {
    id: String;
    storeHouse: any;
    storeHouseForm: FormGroup;
    changeUp = false;

    constructor(
        private _route: Router,
        private route: ActivatedRoute,
        private storeHouseSrv: StorehousesService,
        private fb: FormBuilder,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private toastr: ToastrService,
        private modalService: NgbModal,
        public modal: NgbActiveModal
    ) {}

    get name() {
        return this.storeHouseForm.get('name');
    }

    ngOnInit() {
        this.storeHouseForm = this.fb.group({
            _id: '',
            name: this.fb.control({ value: '', disabled: true }, [Validators.required])
        });

        this.id = this.route.snapshot.paramMap.get('id');
        this.getStoreHouse();
    }

    getStoreHouse() {
        this.storeHouseSrv.storehouse(this.id).subscribe(
            data => {
                this.storeHouse = data;
                this.storeHouseForm.patchValue({
                    _id: this.storeHouse._id,
                    name: data.name
                });
            },
            error => {
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }

    changeUpdate() {
        !this.changeUp ? (this.changeUp = true) : (this.changeUp = false);
        if (this.changeUp) {
            this.storeHouseForm.reset({
                _id: this.storeHouse._id,
                name: { value: this.storeHouse.name, disabled: false }
            });
        }
    }

    updateStoreHouse() {
        this.storeHouseSrv.updateStoreHouse(this.storeHouseForm.value).subscribe(
            data => {
                this.storeHouse = data;
                this.storeHouseForm.reset({
                    _id: this.storeHouse._id,
                    name: { value: this.storeHouse.name, disabled: true }
                });
                this.successMsgSrv.successMessages('Armazém alterado com sucesso.');
            },
            error => {
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }

    open(name: string, storeHouse) {
        const modalRef = this.modalService.open(MODALS[name]);
        modalRef.componentInstance.item = storeHouse;
        modalRef.componentInstance.data = {
            msgConfirmDelete: 'Armazém foi deletado com sucesso.',
            msgQuestionDeleteOne: 'Você tem certeza que deseja deletar o Armazém?',
            msgQuestionDeleteTwo: 'Todas as informações associadas ao armazém serão deletadas.'
        };
        modalRef.componentInstance.delete.subscribe(item => {
            this.delete(item);
        });
    }

    editStoreHouse(storeHouse) {
        this._route.navigate(['/storehouses/edit', storeHouse]);
    }

    delete(storeHouse) {
        this.storeHouseSrv.deleteStoreHouse(storeHouse).subscribe(
            response => {
                this.successMsgSrv.successMessages('Armazém deletado com sucesso.');
                this._route.navigate(['/storehouses']);
            },
            error => {
                this.errorMsg.errorMessages(error);
                console.log('ERROR:', error);
            }
        );
    }
}
