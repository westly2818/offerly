import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Offering {
  id: number;
  amount: number;
  date: string;
  type: string;
}

interface Donation {
  id: number;
  item: string;
  value: number;
  date: string;
  donor: string;
}

interface Fund {
  id: number;
  name: string;
  balance: number;
  contributors: number;
}

interface QuickStats {
  totalOfferingsYTD: number;
  totalDonationsValue: number;
  numberOfMembers: number;
}

interface ChartData {
  name: string;
  value: number;
}

interface Birthday {
  id: number;
  name: string;
  date: string;
  age?: number;
}

interface Anniversary {
  id: number;
  coupleNames: string;
  date: string;
  years?: number;
}

interface SummaryCard {
  title: string;
  value: string;
  icon: string;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  churchName = 'Grace Community Church';
  
  // Summary Cards Data
  summaryCards: SummaryCard[] = [
    {
      title: 'Last Week Sunday Offering',
      value: '₹45,200',
      icon: 'monetization_on',
      color: 'blue',
      trend: { value: 12.5, isPositive: true }
    },
    {
      title: 'This Month Offering',
      value: '₹1,85,400',
      icon: 'account_balance_wallet',
      color: 'green',
      trend: { value: 8.2, isPositive: true }
    },
    {
      title: 'Total Members',
      value: '1,247',
      icon: 'group',
      color: 'purple',
      trend: { value: 3.1, isPositive: true }
    },
    {
      title: 'Active Events',
      value: '8',
      icon: 'event',
      color: 'orange',
      trend: { value: 2, isPositive: false }
    }
  ];

  // Chart Data for Weekly Offerings (Last 6 weeks)
  chartData: ChartData[] = [
    { name: 'Week 1', value: 42000 },
    { name: 'Week 2', value: 38000 },
    { name: 'Week 3', value: 45200 },
    { name: 'Week 4', value: 41000 },
    { name: 'Week 5', value: 48500 },
    { name: 'Week 6', value: 52000 }
  ];

  // Upcoming Birthdays (Next 7 days)
  upcomingBirthdays: Birthday[] = [
    { id: 1, name: 'Sarah Johnson', date: '2024-01-20', age: 28 },
    { id: 2, name: 'Michael Chen', date: '2024-01-22', age: 35 },
    { id: 3, name: 'Emily Davis', date: '2024-01-24', age: 42 },
    { id: 4, name: 'David Wilson', date: '2024-01-25', age: 31 }
  ];

  // Upcoming Anniversaries (Next 7 days)
  upcomingAnniversaries: Anniversary[] = [
    { id: 1, coupleNames: 'John & Mary Smith', date: '2024-01-21', years: 15 },
    { id: 2, coupleNames: 'Robert & Lisa Brown', date: '2024-01-23', years: 8 },
    { id: 3, coupleNames: 'James & Jennifer Taylor', date: '2024-01-26', years: 22 }
  ];

  // Legacy data (keeping for backward compatibility)
  offerings: Offering[] = [
    { id: 1, amount: 2500, date: '2024-01-15', type: 'Sunday Service' },
    { id: 2, amount: 1800, date: '2024-01-08', type: 'Sunday Service' },
    { id: 3, amount: 3200, date: '2024-01-01', type: 'New Year Service' },
    { id: 4, amount: 2100, date: '2023-12-25', type: 'Christmas Service' }
  ];

  donations: Donation[] = [
    { id: 1, item: 'Church Benches', value: 5000, date: '2024-01-10', donor: 'John Smith' },
    { id: 2, item: 'Food Items', value: 300, date: '2024-01-08', donor: 'Mary Johnson' },
    { id: 3, item: 'Cash Donation', value: 1000, date: '2024-01-05', donor: 'David Wilson' },
    { id: 4, item: 'Sound Equipment', value: 2500, date: '2024-01-03', donor: 'Sarah Brown' }
  ];

  funds: Fund[] = [
    { id: 1, name: 'Building Fund', balance: 45000, contributors: 25 },
    { id: 2, name: 'Mission Fund', balance: 12000, contributors: 18 },
    { id: 3, name: 'Youth Fund', balance: 8500, contributors: 12 },
    { id: 4, name: 'Emergency Fund', balance: 15000, contributors: 30 }
  ];

  quickStats: QuickStats = {
    totalOfferingsYTD: 125000,
    totalDonationsValue: 45000,
    numberOfMembers: 156
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // Computed properties
  get thisMonthOfferings(): number {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return this.offerings
      .filter(offering => {
        const offeringDate = new Date(offering.date);
        return offeringDate.getMonth() === currentMonth && offeringDate.getFullYear() === currentYear;
      })
      .reduce((total, offering) => total + offering.amount, 0);
  }

  get lastOffering(): Offering {
    return this.offerings[0]; // Most recent offering
  }

  get totalFundBalance(): number {
    return this.funds.reduce((total, fund) => total + fund.balance, 0);
  }

  get totalActiveContributors(): number {
    return this.funds.reduce((total, fund) => total + fund.contributors, 0);
  }

  get thisMonthDonationsCount(): number {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return this.donations.filter(donation => {
      const donationDate = new Date(donation.date);
      return donationDate.getMonth() === currentMonth && donationDate.getFullYear() === currentYear;
    }).length;
  }

  get latestDonation(): Donation {
    return this.donations[0]; // Most recent donation
  }

  // Navigation methods
  navigateToOfferings(): void {
    // TODO: Implement when offerings module is created
    alert('Offerings module will be implemented soon!');
    // this.router.navigate(['/church-admin/offerings']);
  }

  navigateToFunds(): void {
    // TODO: Implement when funds module is created
    alert('Funds module will be implemented soon!');
    // this.router.navigate(['/church-admin/funds']);
  }

  navigateToDonations(): void {
    // TODO: Implement when donations module is created
    alert('Donations module will be implemented soon!');
    // this.router.navigate(['/church-admin/donations']);
  }

  // Utility methods
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // New utility methods for the redesigned dashboard
  getCardColorClass(color: string): string {
    const colorMap: { [key: string]: string } = {
      'blue': 'card-blue',
      'green': 'card-green',
      'purple': 'card-purple',
      'orange': 'card-orange'
    };
    return colorMap[color] || 'card-blue';
  }

  getTrendIcon(isPositive: boolean): string {
    return isPositive ? 'trending_up' : 'trending_down';
  }

  getTrendColorClass(isPositive: boolean): string {
    return isPositive ? 'trend-positive' : 'trend-negative';
  }

  getChartMaxValue(): number {
    return Math.max(...this.chartData.map(d => d.value)) * 1.1;
  }

  getUpcomingEventsCount(): number {
    return this.upcomingBirthdays.length + this.upcomingAnniversaries.length;
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
