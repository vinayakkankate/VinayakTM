import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LandingPageComponent implements OnInit {

  constructor(public authService:AuthService) { }

  ngOnInit() {
  }

}
