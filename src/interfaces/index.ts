export interface User {
  email: string;
  password: string;
  role: "normal" | "admin" | "superadmin";
}

export interface Loan {
  id: string;
  userEmail: string;
  amount: number;
  totalLoan: number;
  status: "pending" | "active";
  maturityDate: string;
}
