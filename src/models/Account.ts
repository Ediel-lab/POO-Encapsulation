export class Account {
  private _id: number;
  private _name: string;
  private _balance: number;

  constructor(id: number, name: string, balance: number = 0) {
    if (id <= 0) throw new Error('ID must be positive.');
    if (!name.trim()) throw new Error('Name cannot be empty.');
    if (balance < 0) throw new Error('Initial balance cannot be negative.');

    this._id = id;
    this._name = name;
    this._balance = balance;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get balance(): number {
    return this._balance;
  }

  deposit(amount: number): void {
    if (amount <= 0) throw new Error('Deposit amount must be positive.');
    this._balance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= 0) throw new Error('Withdrawal amount must be positive.');
    if (amount > this._balance) throw new Error('Insufficient funds.');
    this._balance -= amount;
  }
}
