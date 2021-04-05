import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css']
})
export class UserCardsComponent implements OnInit {
  cards:Card[];

  constructor(
    private cardService:CardService,
    private authService:AuthService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.getCardsByUserId();
  }

  getCardsByUserId(){
    this.cardService.getCardsByUserId(this.authService.getUserId()).subscribe(response => {
      this.cards = response.data;
    })
  }

  deleteCard(card:Card){
    this.cardService.deleteCard(card).subscribe(response => {
      this.toastrService.success(response.message,"Başarılı")
      setTimeout(function () {
        location.reload();
      });
    })
  }

}