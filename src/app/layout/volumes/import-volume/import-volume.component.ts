import { Component, OnInit, HostListener } from '@angular/core';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import * as XLSX from 'ts-xlsx';

@Component({
  selector: 'app-import-volume',
  templateUrl: './import-volume.component.html',
  styleUrls: ['./import-volume.component.scss']
})
export class ImportVolumeComponent implements OnInit {
  file: File | null = null;
  nameFile: string;
  arrayBuffer: any;

  constructor(
    private errorMsg: ErrorMessagesService,
  ) { }

  ngOnInit() {
  }

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    this.nameFile = event.item(0).name;
    const file = event && event.item(0);
    if (!file.name.match(/\.(xls|xlsx|XLS|XLSX)$/)) {
      this.removeFile();
      var error = {
        status: 404,
        message: 'Formato de arquivo não suportado.'
      }
      this.errorMsg.showError(error);

    } else {
      // this.onChange(file);
      this.file = file;
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });
        workbook.SheetNames.map(aba => {
          var first_sheet_name = aba;
          console.log(first_sheet_name);
          var worksheet = workbook.Sheets[first_sheet_name];
          console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
        })
        /* var first_sheet_name = workbook.SheetNames[0];
        console.log(first_sheet_name);
        var worksheet = workbook.Sheets[first_sheet_name];
        console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true })); */
      }
      fileReader.readAsArrayBuffer(this.file);
    }

  }

  readXls() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
    }
    fileReader.readAsArrayBuffer(this.file);
  }

  removeFile() {
    // this.host.nativeElement.value = '';
    this.file = null;
    this.nameFile = null;
  }

}
