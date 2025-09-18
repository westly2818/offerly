import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

type OfferingType = 'Weekly' | 'General Offering' | 'Special Offering' | 'Donation';
type DonationKind = 'Money' | 'Things';

export interface OfferingRow {
  date: string;
  type: OfferingType;
  donationKind?: DonationKind;
  amount?: number;
  donationDescription?: string;
  givenBy?: string;
  notes?: string;
}

@Component({
  selector: 'app-offering',
  templateUrl: './offering.component.html',
  styleUrls: ['./offering.component.scss']
})
export class OfferingComponent implements OnInit {
  offeringForm!: FormGroup;
  offeringTypes: OfferingType[] = ['Weekly', 'General Offering', 'Special Offering', 'Donation'];
  donationKinds: DonationKind[] = ['Money', 'Things'];

  offerings: OfferingRow[] = [
    { date: '2025-09-10', type: 'Weekly', amount: 5200, notes: 'Morning service' },
    { date: '2025-09-12', type: 'Special Offering', amount: 15000, givenBy: 'Community Group', notes: 'Building fund' },
    { date: '2025-09-13', type: 'Donation', donationKind: 'Things', donationDescription: 'Sound system', givenBy: 'Tech Corp' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.offeringForm = this.fb.group({
      date: [this.toDateInputValue(new Date()), Validators.required],
      type: ['Weekly' as OfferingType, Validators.required],
      donationKind: ['Money' as DonationKind],
      amount: [null],
      donationDescription: [''],
      givenBy: [''],
      notes: ['']
    });

    this.offeringForm.get('type')!.valueChanges.subscribe(() => this.updateValidators());
    this.offeringForm.get('donationKind')!.valueChanges.subscribe(() => this.updateValidators());
    this.updateValidators();
  }

  private updateValidators(): void {
    const type: OfferingType = this.offeringForm.get('type')!.value;
    const donationKind: DonationKind = this.offeringForm.get('donationKind')!.value;

    const amountCtrl = this.offeringForm.get('amount')!;
    const donationDescriptionCtrl = this.offeringForm.get('donationDescription')!;
    const givenByCtrl = this.offeringForm.get('givenBy')!;

    // Reset validators
    amountCtrl.clearValidators();
    donationDescriptionCtrl.clearValidators();
    givenByCtrl.clearValidators();

    if (type === 'Special Offering') {
      givenByCtrl.setValidators([Validators.required, Validators.minLength(2)]);
      amountCtrl.setValidators([Validators.required, Validators.min(1)]);
    } else if (type === 'Donation') {
      if (donationKind === 'Money') {
        amountCtrl.setValidators([Validators.required, Validators.min(1)]);
      } else {
        donationDescriptionCtrl.setValidators([Validators.required, Validators.minLength(3)]);
      }
      givenByCtrl.setValidators([Validators.required, Validators.minLength(2)]);
    } else {
      // Weekly / General Offering
      amountCtrl.setValidators([Validators.required, Validators.min(1)]);
    }

    amountCtrl.updateValueAndValidity();
    donationDescriptionCtrl.updateValueAndValidity();
    givenByCtrl.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.offeringForm.invalid) {
      this.offeringForm.markAllAsTouched();
      return;
    }

    const value = this.offeringForm.value as OfferingRow;
    const newRow: OfferingRow = { ...value };
    this.offerings = [newRow, ...this.offerings];
    this.resetFormAfterSubmit();
  }

  private resetFormAfterSubmit(): void {
    const currentType: OfferingType = this.offeringForm.get('type')!.value;
    this.offeringForm.reset({
      date: this.toDateInputValue(new Date()),
      type: currentType,
      donationKind: 'Money',
      amount: null,
      donationDescription: '',
      givenBy: '',
      notes: ''
    });
    this.updateValidators();
  }

  isType(type: OfferingType): boolean {
    return this.offeringForm.get('type')!.value === type;
  }

  isDonation(kind?: DonationKind): boolean {
    const t = this.offeringForm.get('type')!.value as OfferingType;
    if (t !== 'Donation') return false;
    if (!kind) return true;
    return (this.offeringForm.get('donationKind')!.value as DonationKind) === kind;
  }

  get amountCtrl() { return this.offeringForm.get('amount'); }
  get donationDescriptionCtrl() { return this.offeringForm.get('donationDescription'); }
  get givenByCtrl() { return this.offeringForm.get('givenBy'); }

  formatCurrency(val?: number): string {
    if (val == null) return '-';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  }

  private toDateInputValue(date: Date): string {
    const off = date.getTimezoneOffset();
    const d = new Date(date.getTime() - (off*60*1000));
    return d.toISOString().slice(0,10);
  }
}

