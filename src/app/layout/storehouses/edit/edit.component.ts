import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { routerTransition } from 'src/app/router.animations';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
    animations: [routerTransition()]
})
export class EditComponent implements OnInit {
    id: String;
    storeHouse: any;
    closeResult: string;
    storeHouseForm: FormGroup;
    mapHouseForm: FormGroup;
    modalOptions:NgbModalOptions;
    changeUp = false;
    loading: Boolean = true;

    constructor(
        private _route: Router,
        private modalService: NgbModal,
        private route: ActivatedRoute,
        private storeHouseSrv: StorehousesService,
        private fb: FormBuilder,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService
    ) {
        this.modalOptions = {
            backdrop: 'static',
            backdropClass: 'customBackdrop',
            keyboard: false,
            size: 'lg',
            centered: true,
            windowClass: 'customMod'
        };
    }

    get name() {
        return this.storeHouseForm.get('name');
    }

    ngOnInit() {
        this.storeHouseForm = this.fb.group({
            _id: '',
            name: this.fb.control('', [Validators.required]),
            mapStorehouse: this.fb.control({ value: '', enabled: true }),
        });

        this.id = this.route.snapshot.paramMap.get('id');
        this.getStoreHouse();
        setTimeout(function() {$('#openMod')[0].click(); }, 0);

    }

    getStoreHouse() {
        this.storeHouseSrv.storehouse(this.id).subscribe(
            data => {
                this.loading = false;
                this.storeHouse = data;
                this.storeHouseForm.patchValue({
                    _id: this.storeHouse._id,
                    name: data.name,
                    mapStorehouse: data.mapStorehouse,
                });
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }

    updateStoreHouse() {
        this.loading = true;
        this.storeHouseSrv.updateStoreHouse(this.storeHouseForm.value).subscribe(
            data => {
                this.loading = false;
                this.storeHouse = data;
                this.storeHouseForm.reset({
                    _id: this.storeHouse._id,
                    name: { value: this.storeHouse.name, disabled: true }
                });
                this.successMsgSrv.successMessages('Depósito alterado com sucesso.');
                this._route.navigate(['/storehouses/get', data._id], {skipLocationChange: true});
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }
    openMod(content) {
        this.modalService.open(content, this.modalOptions).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        this.redirect();
      }
      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return  `with: ${reason}`;
        }
      }
      redirect() {
        setTimeout(() => {
            this._route.navigate([`/${'storehouses'}`], {skipLocationChange: true});
        },0 );
    }
}
