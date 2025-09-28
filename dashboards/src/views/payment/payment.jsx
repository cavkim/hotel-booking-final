"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialPayments = [
  {
    id: "TXN001",
    guest: "John Doe",
    amount: "$750.00",
    method: "Card",
    status: "Paid",
    date: "2024-07-09",
  },
  {
    id: "TXN002",
    guest: "Jane Smith",
    amount: "$200.00",
    method: "Wallet",
    status: "Paid",
    date: "2024-07-08",
  },
];

export default function PaymentPage() {
  const [payments, setPayments] = useState(initialPayments);
  const [refundForm, setRefundForm] = useState({
    reason: "",
    amount: "",
    transactionId: "",
  });

  const handleView = (paymentId) => {
    console.log("View payment:", paymentId);
    // Add view functionality here
  };

  const handleEdit = (paymentId) => {
    console.log("Edit payment:", paymentId);
    // Add edit functionality here
  };

  const handleProcessRefund = () => {
    console.log("Process refund:", refundForm);
    // Add refund processing functionality here
    setRefundForm({ reason: "", amount: "", transactionId: "" });
  };

  const handleRefundFormChange = (field, value) => {
    setRefundForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Payment Table Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Payment</h2>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Transaction ID</TableHead>
                <TableHead className="font-semibold">Guest</TableHead>
                <TableHead className="font-semibold">Amount</TableHead>
                <TableHead className="font-semibold">Method</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.guest}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {payment.status}
                    </span>
                  </TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleView(payment.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-xs"
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleEdit(payment.id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 text-xs"
                      >
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Manual Refund Control Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Manual Refund Control
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Input
              id="reason"
              value={refundForm.reason}
              onChange={(e) => handleRefundFormChange("reason", e.target.value)}
              placeholder="Enter refund reason"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="refundAmount">Refund Amount</Label>
            <Input
              id="refundAmount"
              value={refundForm.amount}
              onChange={(e) => handleRefundFormChange("amount", e.target.value)}
              placeholder="Enter amount"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="transactionId">Transaction ID</Label>
            <Input
              id="transactionId"
              value={refundForm.transactionId}
              onChange={(e) =>
                handleRefundFormChange("transactionId", e.target.value)
              }
              placeholder="Enter transaction ID"
            />
          </div>
        </div>

        <Button
          onClick={handleProcessRefund}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Process Refund
        </Button>
      </div>
    </div>
  );
}
