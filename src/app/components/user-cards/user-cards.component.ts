import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
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
    private cardDetail:CardService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.getCardsByUserId();
  }

  getCardsByUserId(){
    this.cardDetail.getCardsByUserId(this.authService.getUserId()).subscribe(response => {
      this.cards = response.data;
    })
  }

}