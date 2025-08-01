export class BankAccount {
  id: number;
  name: string;
  private balance: number;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.balance = 0;
  }

  deposit(amount: number) {
    if (amount > 0) {
      this.balance += amount;
    }
  }

  withdraw(amount: number) {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
    }
  }

  getBalance(): number {
    return this.balance;
  }
}
