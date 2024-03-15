'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

// https://docs.tosspayments.com/reference#payment-객체
interface Payment {
  orderName: string;
  approvedAt: string;
  receipt: {
    url: string;
  };
  totalAmount: number;
  method: '카드' | '가상계좌' | '계좌이체';
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const [payment, setPayment] = useState<Payment | null>(null);

  useEffect(() => {
    if (!searchParams) return;

    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');

    if (!paymentKey || !orderId || !amount) return;

    const fetchPayment = async () => {
      try {
        const response = await axios.post<Payment>(
          'https://api.tosspayments.com/v1/payments/confirm',
          {
            paymentKey,
            orderId,
            amount,
          },
          {
            headers: {
              Authorization: `Basic ${Buffer.from(
                `${process.env.NEXT_PUBLIC_TOSS_SECRET_KEY}:`
              ).toString('base64')}`,
            },
          }
        );
        setPayment(response.data);
      } catch (err) {
        console.error('err', err);
      }
    };

    fetchPayment();
  }, [searchParams]);

  if (!payment || !searchParams) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>결제 성공</CardTitle>
          <CardDescription>주문: {payment.orderName}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Label>결제 수단 : {payment.method}</Label>
          <Label>결제 금액 : {payment.totalAmount.toLocaleString()}원</Label>
          <Label>
            결제 일시 :
            {format(new Date(payment.approvedAt), 'yyyy/MM/dd HH:mm:ss')}
          </Label>
          <Label>
            <a href={payment.receipt.url}>영수증</a>
          </Label>
        </CardContent>
      </Card>
    </main>
  );
}
