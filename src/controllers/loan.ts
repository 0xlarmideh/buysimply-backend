import { Request, Response } from "express";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { Loan } from "../interfaces";

const loans: Loan[] = JSON.parse(
  readFileSync(join(__dirname, "../data/loans.json"), "utf-8")
);

export const getAllLoans = (req: Request, res: Response) => {
  const role = (req as any).user.role;
  const filteredLoans = loans.map((loan) => {
    if (role === "normal") {
      const { totalLoan, ...otherDetails } = loan;
      return otherDetails;
    }
    return loan;
  });
  res.json(filteredLoans);
};

export const getLoansByStatus = (req: Request, res: Response) => {
  const { status } = req.query;
  const filteredLoans = loans.filter((loan) => loan.status === status);
  res.json(filteredLoans);
};

export const getUserLoans = (req: Request, res: Response) => {
  const { userEmail } = req.params;
  const userLoans = loans.filter((loan) => loan.userEmail === userEmail);
  res.json({ loans: userLoans });
};

export const getExpiredLoans = (req: Request, res: Response) => {
  const expiredLoans = loans.filter(
    (loan) => new Date(loan.maturityDate) < new Date()
  );
  res.json(expiredLoans);
};

export const deleteLoan = (req: Request, res: Response) => {
  const { loanId } = req.params;
  const role = (req as any).user.role;

  if (role !== "superadmin") {
    return res.status(403).send("Forbidden");
  }

  const loanIndex = loans.findIndex((loan) => loan.id === loanId);
  if (loanIndex > -1) {
    loans.splice(loanIndex, 1);
    writeFileSync(
      join(__dirname, "../data/loans.json"),
      JSON.stringify(loans, null, 2)
    );
    res.json({ message: "Loan deleted" });
  } else {
    res.status(404).send("Loan not found");
  }
};
