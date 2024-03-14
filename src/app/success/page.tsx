'use client';

import axios from 'axios';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
  const searchParams = useSearchParams();

  const paymentKey = searchParams.get('paymentKey');
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');
  const [payment, setPayment] = useState<Payment | null>(null);

  useEffect(() => {
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
  }, [paymentKey, orderId, amount]);

  if (!payment) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1>결제 성공</h1>
      <p>주문: {payment.orderName}</p>
      <p>결제 수단: {payment.method}</p>
      <p>결제 금액: {payment.totalAmount.toLocaleString()}원</p>
      <p>
        결제 일시: {format(new Date(payment.approvedAt), 'yyyy/MM/dd HH:mm:ss')}
      </p>
      <p>
        <a href={payment.receipt.url}>영수증</a>
      </p>
    </main>
  );
}
