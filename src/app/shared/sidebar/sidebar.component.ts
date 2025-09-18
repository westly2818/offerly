import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  children?: MenuItem[];
  isActive?: boolean;
}

export interface UserRole {
  role: 'church-admin' | 'member' | 'super-admin';
  name: string;
  churchName?: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() userRole: UserRole | null = null;
  @Input() isCollapsed: boolean = false;
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() menuItemClick = new EventEmitter<MenuItem>();

  menuItems: MenuItem[] = [];
  currentRoute: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setupMenuItems();
    this.currentRoute = this.router.url;
  }

  setupMenuItems(): void {
    if (!this.userRole) {
      this.menuItems = [];
      return;
    }

    switch (this.userRole.role) {
      case 'church-admin':
        this.menuItems = [
          {
            id: 'dashboard',
            label: 'Dashboard',
            icon: 'dashboard',
            route: '/church-admin/dashboard'
          },
          {
            id: 'offerings',
            label: 'Offerings',
            icon: 'monetization_on',
            route: '/church-admin/offerings'
          },
          {
            id: 'user-management',
            label: 'User Management',
            icon: 'group',
            route: '/church-admin/users',
            children: [
              {
                id: 'members',
                label: 'Members',
                icon: 'person',
                route: '/church-admin/users/members'
              },
              {
                id: 'staff',
                label: 'Staff',
                icon: 'badge',
                route: '/church-admin/users/staff'
              },
              {
                id: 'volunteers',
                label: 'Volunteers',
                icon: 'volunteer_activism',
                route: '/church-admin/users/volunteers'
              }
            ]
          },
          {
            id: 'reports',
            label: 'Reports',
            icon: 'assessment',
            route: '/church-admin/reports',
            children: [
              {
                id: 'financial-reports',
                label: 'Financial Reports',
                icon: 'account_balance_wallet',
                route: '/church-admin/reports/financial'
              },
              {
                id: 'attendance-reports',
                label: 'Attendance Reports',
                icon: 'people',
                route: '/church-admin/reports/attendance'
              },
              {
                id: 'donation-reports',
                label: 'Donation Reports',
                icon: 'card_giftcard',
                route: '/church-admin/reports/donations'
              }
            ]
          },
          {
            id: 'funds',
            label: 'Funds',
            icon: 'account_balance',
            route: '/church-admin/funds'
          },
          {
            id: 'donations',
            label: 'Donations',
            icon: 'volunteer_activism',
            route: '/church-admin/donations'
          },
          {
            id: 'events',
            label: 'Events',
            icon: 'event',
            route: '/church-admin/events'
          },
          {
            id: 'settings',
            label: 'Settings',
            icon: 'settings',
            route: '/church-admin/settings'
          }
        ];
        break;

      case 'member':
        this.menuItems = [
          {
            id: 'dashboard',
            label: 'My Dashboard',
            icon: 'dashboard',
            route: '/member/dashboard'
          },
          {
            id: 'my-offerings',
            label: 'My Offerings',
            icon: 'monetization_on',
            route: '/member/offerings'
          },
          {
            id: 'my-donations',
            label: 'My Donations',
            icon: 'card_giftcard',
            route: '/member/donations'
          },
          {
            id: 'events',
            label: 'Events',
            icon: 'event',
            route: '/member/events'
          },
          {
            id: 'profile',
            label: 'My Profile',
            icon: 'person',
            route: '/member/profile'
          }
        ];
        break;

      case 'super-admin':
        this.menuItems = [
          {
            id: 'dashboard',
            label: 'Super Admin Dashboard',
            icon: 'admin_panel_settings',
            route: '/super-admin/dashboard'
          },
          {
            id: 'churches',
            label: 'Churches',
            icon: 'church',
            route: '/super-admin/churches'
          },
          {
            id: 'users',
            label: 'All Users',
            icon: 'group',
            route: '/super-admin/users'
          },
          {
            id: 'reports',
            label: 'System Reports',
            icon: 'assessment',
            route: '/super-admin/reports'
          },
          {
            id: 'settings',
            label: 'System Settings',
            icon: 'settings',
            route: '/super-admin/settings'
          }
        ];
        break;

      default:
        this.menuItems = [];
    }
  }

  onMenuItemClick(item: MenuItem): void {
    if (item.children && item.children.length > 0) {
      // Toggle children visibility
      item.isActive = !item.isActive;
    } else {
      // Navigate to route
      this.router.navigate([item.route]);
      this.menuItemClick.emit(item);
    }
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  isRouteActive(route: string): boolean {
    return this.currentRoute.includes(route);
  }

  hasActiveChild(item: MenuItem): boolean {
    if (!item.children) return false;
    return item.children.some(child => this.isRouteActive(child.route));
  }

  logout(): void {
    // TODO: Implement logout logic
    this.router.navigate(['/login']);
  }
}
