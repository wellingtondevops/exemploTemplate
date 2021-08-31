
import { Page } from './../../../models/page';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { routerTransition } from 'src/app/router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import _ from 'lodash';
import { PositionList } from 'src/app/models/position';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

const MODALS = {
    focusFirst: NgbdModalConfirmComponent,
};
@Component({
    selector: 'app-show',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.scss'],
    animations: [routerTransition()],
})
export class ShowComponent implements OnInit {
    id: String;
    storeHouse: any;
    storeHouseForm: FormGroup;
    mapHouseForm: FormGroup;
    searchForm: FormGroup;
    changeUp = false;
    loading: Boolean = true;
    permissionEdit = false;
    permissionDelete = false;
    positions: PositionList = {
        _links: {
            currentPage: 1,
            foundItems: 0,
            next: '',
            self: '',
            totalPage: 0,
        },
        items: []
    };
    page = new Page();
        columns = [
            { name: 'Posição', prop: 'position' },
            { name: 'Empresa', prop: 'company.name' },
            { name: 'Departamento', prop: 'departament.name' },
            { name: 'Situação da Posição', prop: 'used' }
        ];
        permissionNew: boolean = false;

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
            name: this.fb.control({ value: '', disabled: true }, [
                Validators.required,
            ]),
            mapStorehouse: this.fb.control({ value: '', disabled: true }),
        });
        //this.getPosicoes();
        this.permissionNew = JSON.parse(window.localStorage.getItem('actions'))[0].write


        this.id = this.route.snapshot.paramMap.get('id');
        this.getStoreHouse();
        this.permissionEdit = JSON.parse(
            window.localStorage.getItem('actions')
        )[0].change;
        this.permissionDelete = JSON.parse(
            window.localStorage.getItem('actions')
        )[0].delete;

    }

    getStoreHouse() {
        this.storeHouseSrv.storehouse(this.id).subscribe(
            (data) => {
                this.loading = false;
                (this.storeHouse = data),
                    this.storeHouseForm.patchValue({
                        _id: this.storeHouse._id,
                        name: data.name,
                        mapStorehouse: data.mapStorehouse,
                    });
            },
            (error) => {
                this.loading = false;
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
                name: { value: this.storeHouse.name, disabled: false },
            });
        }
    }

    updateStoreHouse() {
        this.loading = true;
        this.storeHouseSrv
            .updateStoreHouse(this.storeHouseForm.value)
            .subscribe(
                (data) => {
                    this.loading = false;
                    this.storeHouse = data;
                    this.storeHouseForm.reset({
                        _id: this.storeHouse._id,
                        name: { value: this.storeHouse.name, disabled: true },
                    });
                    this.successMsgSrv.successMessages(
                        'Depósito alterado com sucesso.'
                    );
                },
                (error) => {
                    this.loading = false;
                    this.errorMsg.errorMessages(error);
                    console.log('ERROR: ', error);

                }
            );
    }

    open(name: string, storeHouse) {
        const modalRef = this.modalService.open(MODALS[name]);
        modalRef.componentInstance.item = storeHouse;
        modalRef.componentInstance.data = {
            msgConfirmDelete: 'Depósito foi deletado com sucesso.',
            msgQuestionDeleteOne:
                'Você tem certeza que deseja deletar o Depósito?',
            msgQuestionDeleteTwo:
                'Todas as informações associadas ao Depósito serão deletadas.',
        };
        modalRef.componentInstance.delete.subscribe((item) => {
            this.delete(item);
        });
    }

    editStoreHouse(storeHouse) {
        this._route.navigate(['/storehouses/edit', storeHouse]);
    }

    delete(storeHouse) {
        this.loading = true;
        this.storeHouseSrv.deleteStoreHouse(storeHouse).subscribe(
            (response) => {
                this.loading = false;
                this.successMsgSrv.successMessages(
                    'Depósito deletado com sucesso.'
                );
                this._route.navigate(['/storehouses']);
            },
            (error) => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR:', error);
            }
        );
    }

    

    getPosicoes() {
        this.setPagePositions({ offset: 0 });
    }

    setPagePositions(pageInfo) {
        this.loading = true;
        this.page.pageNumber = pageInfo.offset;
        const newSearch = {
            position: null,
            departament: {
                name: null,
                _id: null,
            },
            company: {
                name: null,
                _id: null,
            },
            used: null,
        };
        this.searchForm.value.position ? newSearch.position = this.storeHouseForm.value.position : null;
        this.searchForm.value.departament ? newSearch.departament = this.storeHouseForm.value.departament : null;
        this.searchForm.value.company ? newSearch.company = this.storeHouseForm.value.company : null;
        this.searchForm.value.used ? newSearch.used = this.storeHouseForm.value.used : null;

        const searchValue = _.omitBy(newSearch, _.isNil);

        this.storeHouseSrv.searchPosition(searchValue, this.id, this.page).subscribe(data => {
          this.loading = false;
          //this.positions = data;
          this.page.pageNumber = data._links.currentPage;
          this.page.totalElements = data._links.foundItems;
          this.page.size = data._links.totalPage;
        }, error => {
          this.errorMsg.errorMessages(error);
          this.loading = false;
          console.log(`ERROR: ${error}`)
        });
      }

    setPage(pageInfo) {
        this.loading = true;
        this.page.pageNumber = pageInfo.offset;

        this.storeHouseSrv.searchPosition(this.storeHouseForm.value, this.page, this.id).subscribe(data => {
            this.page.pageNumber = data._links.currentPage - 1;
            this.page.totalElements = data._links.foundItems;
            this.page.size = data._links.totalPage;
            //this.positions = data;
            this.loading = false;
        }, error => {
            console.log('ERROR: ', error);
            this.loading = false;
        });
    }
}
