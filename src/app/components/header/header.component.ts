import { Component, OnInit } from '@angular/core';
import { ButtonStandardComponent } from '../button-standard/button-standart.component';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';

export interface MenuItem {
  rout: string;
  icon: string;
  text: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [ CommonModule, ButtonStandardComponent, RouterModule , MatIconModule ]
})
export class HeaderComponent implements OnInit {
  themeFromLocalStorage = localStorage.getItem('theme');
  theme: string;
  menuItem: MenuItem[] = [
    { rout: '', icon: 'home', text: 'Home' },
    { rout: '/profile', icon: 'account_box', text: 'Profile'  },
    { rout: '/todo', icon: 'account_box', text: 'Todo'  }
  ]

  menu: [1,2]
  ngOnInit(): void {
    this.menuItem
    const body = document.getElementsByTagName('body')[0];
    this.theme = this.themeFromLocalStorage || 'light-theme';
    if (this.theme === 'dark-theme'){
      body.classList.add('dark-theme');

    } 
  }

  onClickTheme() {
    this.theme = this.theme === 'dark-theme' ? 'light-theme' : 'dark-theme';

    localStorage.setItem('theme', this.theme);

    const body = document.getElementsByTagName('body')[0];
    if (this.theme === 'light-theme') {
      body.classList.remove('dark-theme');
    } else {
      body.classList.add('dark-theme');
    }
    return true;
  }
}
