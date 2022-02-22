import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SaveLocal } from './../../../storage/saveLocal';
import { Page } from './../../../models/page';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { routerTransition } from 'src/app/router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import _ from 'lodash';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { NgbModal, NgbActiveModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PositionList } from 'src/app/models/position';
import { NgIf } from '@angular/common';
import { IntroJsService } from 'src/app/services/introJs/intro-js.service';


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
    title = 'ng-bootstrap-modal-demo';
    //closeResult: string;
    //modalOptions:NgbModalOptions;
    id: String;
    storeHouse: any;
    storeHouseForm: FormGroup;
    mapHouseForm: FormGroup;
    searchForm: FormGroup;
    changeUp = false;
    situacao: string;
    loading: Boolean = true;
    used: Boolean = false;
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
        items: [],
    };
    page = new Page();

    columns = [
        { name: 'Posição', prop: 'position' },
        { name: 'Empresa', prop: 'company.name' },
        { name: 'Departamento', prop: 'departament.name' },
        //{ name: 'Situação da Posição', prop: 'used' },
    ];
    permissionNew = false;

    constructor(
        private _route: Router,
        private route: ActivatedRoute,
        private storeHouseSrv: StorehousesService,
        private fb: FormBuilder,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private toastr: ToastrService,
        private modalService: NgbModal,
        public modal: NgbActiveModal,
        private localStorageSrv: SaveLocal,
        private introService: IntroJsService,
    ) {
       /* this.modalOptions = {
            backdrop: 'static',
            backdropClass: 'customBackdrop',
            keyboard: false,
            size: 'lg',
            centered: true,
            windowClass: 'customMod'
        }; */
    }

    get name() {
        return this.storeHouseForm.get('name');
    }
    get position() {
        return this.storeHouseForm.get('position');
    }

    ngOnInit() {
        this.storeHouseForm = this.fb.group({
            _id: '',
            position: this.fb.control(null, [Validators.required]),
            name: this.fb.control({ value: '', disabled: true }, [
                Validators.required,
            ]),
            used: this.fb.control({ value: '',}),
            mapStorehouse: this.fb.control({ value: '', disabled: true }),
        });
        const positions = JSON.parse(this.localStorageSrv.get('positions'));
        if (positions && positions.name) {
            this.storeHouseForm.patchValue({
                position: positions.position
            });
        }

        // this.getPosicoes();
        this.permissionNew = JSON.parse(
            window.localStorage.getItem('actions')
        )[0].write;

        this.id = this.route.snapshot.paramMap.get('id');
        this.getStoreHouse();
        this.permissionEdit = JSON.parse(
            window.localStorage.getItem('actions')
        )[0].change;
        this.permissionDelete = JSON.parse(
            window.localStorage.getItem('actions')
        )[0].delete;
        //setTimeout(function() {$('#openMod')[0].click(); }, 0);
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
        this._route.navigate(['/storehouses/edit', storeHouse],  {skipLocationChange: true});
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

    getPosition(position) {
        this._route.navigate(['/position/get', position.position]);
    }
    getUsed(used) {
        this._route.navigate(['/position/get', used.used]);
    }

    getPosicoes() {
        this.setPagePositions({ offset: 0 });
    }

    setPagePositions(pageInfo) {
        this.loading = true;
        this.page.pageNumber = pageInfo.offset;
        this.localStorageSrv.save('positions', this.storeHouseForm.value);

        this.storeHouseSrv
        .searchPosition(this.storeHouseForm.value, this.page, this.id)
        .subscribe(
            (data) => {
                    this.page.pageNumber = data._links.currentPage - 1;
                    this.page.totalElements = data._links.foundItems;
                    this.page.size = data._links.totalPage;
                    this.positions = data;
                    this.loading = false;
                },
                (error) => {
                    console.log('ERROR: ', error);
                    this.loading = false;
                }
            );
    }

    setPage(pageInfo) {
        this.loading = true;
        this.page.pageNumber = pageInfo.offset;

        this.storeHouseSrv
            .searchPosition(this.storeHouseForm.value, this.page, this.id)
            .subscribe(
                (data) => {
                    this.page.pageNumber = data._links.currentPage;
                    this.page.totalElements = data._links.foundItems;
                    this.page.size = data._links.totalPage;
                    this.positions = data;
                    this.loading = false;
                },
                (error) => {
                    console.log('ERROR: ', error);
                    this.loading = false;
                }
            );
    }
    clear() {
        this.localStorageSrv.clear('position');

        this.storeHouseForm.patchValue({
            position: null
        });
    }

    help() {
        this.introService.ShowStoreHouse();
    }
    /*
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
            this._route.navigate([`/${'storehouses'}`]);
        },0 );
    }
    */

}
