import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserRole } from './shared/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'offerly';
  showSidebar = false;
  isSidebarCollapsed = false;
  currentUserRole: UserRole | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Listen to route changes to determine if sidebar should be shown
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateSidebarVisibility(event.url);
      }
    });

    // Initialize with current route
    this.updateSidebarVisibility(this.router.url);
  }

  updateSidebarVisibility(url: string): void {
    // Show sidebar for authenticated routes (not login)
    this.showSidebar = !url.includes('/login');
    
    if (this.showSidebar) {
      // Determine user role based on route
      if (url.includes('/church-admin')) {
        this.currentUserRole = {
          role: 'church-admin',
          name: 'John Admin',
          churchName: 'Grace Community Church'
        };
      } else if (url.includes('/member')) {
        this.currentUserRole = {
          role: 'member',
          name: 'Jane Member',
          churchName: 'Grace Community Church'
        };
      } else if (url.includes('/super-admin')) {
        this.currentUserRole = {
          role: 'super-admin',
          name: 'Super Admin'
        };
      } else {
        // Default to church-admin for now
        this.currentUserRole = {
          role: 'church-admin',
          name: 'John Admin',
          churchName: 'Grace Community Church'
        };
      }
    } else {
      this.currentUserRole = null;
    }
  }

  onToggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  onMenuItemClick(): void {
    // Handle menu item clicks if needed
  }
}
