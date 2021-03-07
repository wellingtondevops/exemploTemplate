import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Moviment } from 'src/app/models/moviment';
import { MovimentsService } from 'src/app/services/moviments/moviments.service';

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.scss']
})
export class ExtractComponent implements OnInit {
  id: string;
  moviment: Moviment;
  itemsVolume: any = [];
  itemsArchive: any = [];
  
  constructor(
    private movimentsSrv: MovimentsService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getMoviment();
    
  }

  getMoviment(){
    this.movimentsSrv.moviment(this.id).subscribe(
      data => {
        this.moviment = data;
        if(this.moviment._id && this.moviment.moveVolume){
          this.getItemsVolume();
        }
        if(this.moviment._id && this.moviment.moveArchive){
          this.getItemsArchive()
        }
      }, error => {
        console.log('ERROR', error);
      })
  }

  delivery(){
    if(this.moviment.withdraw){
      return 'Retirada'
    } else if (this.moviment.delivery){
      return 'Entrega';
    } else {
      return 'Digital';
    }
  }

  getItemsVolume(){
    this.movimentsSrv.showItensVolumes(this.moviment._id, null).subscribe(data => {
      this.itemsVolume = data.items;
    }, error => {
      console.log('ERROR', error);
    })
  }

  getItemsArchive(){
    this.movimentsSrv.showItensArchives(this.moviment._id, null).subscribe(data => {
      this.itemsArchive = data.items;
    }, error => {
      console.log('ERROR', error);
    })
  }
}
