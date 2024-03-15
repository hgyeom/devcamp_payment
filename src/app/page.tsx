'use client';

import { z } from 'zod';
import { nanoid } from 'nanoid';
import { useAsync } from 'react-use';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ANONYMOUS,
  PaymentWidgetInstance,
  loadPaymentWidget,
} from '@tosspayments/payment-widget-sdk';

import { useEffect, useRef, useState } from 'react';

import { schema } from '@/validators/payment';

import OrderItems from '@/components/order/orderItems';
import OrderInfomation from '@/components/order/orderInformation';
import PaymentInformation from '@/components/payment/paymentInformation';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const items = [
  {
    img: '/banana.jpg',
    name: '바나나',
    price: 1400,
    count: 2,
    total: 2800,
  },
  { img: '/tomato.jpg', name: '토마토', price: 800, count: 2, total: 1600 },
  { img: '/gaji.jpg', name: '가지', price: 500, count: 4, total: 2000 },
];

const totalPrice = items.reduce((sum, item) => sum + item.total, 0);
const point = 6000;

const coupons = [
  {
    code: 1,
    discountType: 'fixed', // 정액 할인
    discountValue: '5000', // 할인 금액
    name: '5000원 할인쿠폰',
    status: 'notUsed',
  },
  {
    code: 2,
    discountType: 'percent', // 퍼센트 할인
    discountValue: '10', // 할인 비율
    name: '10% 할인쿠폰',
    status: 'notUsed',
  },
  {
    code: 3,
    discountType: 'percent',
    discountValue: '10',
    name: '10% 할인쿠폰',
    status: 'notUsed',
  },
];

// 변수
const tossClientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;

export default function Home() {
  const [finalPrice, setFinalPrice] = useState(totalPrice);

  // toss
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null>(null);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      zonecode: '',
      addr: '',
      addrDetail: '',
    },
  });

  // ------ toss 위젯 ------
  useAsync(async () => {
    if (!tossClientKey) return;
    // ------  결제위젯 초기화 ------
    const paymentWidget = await loadPaymentWidget(tossClientKey, ANONYMOUS); // 비회원 결제

    // ------  결제위젯 렌더링 ------
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      '#payment-widget',
      { value: finalPrice },
      { variantKey: 'DEFAULT' }
    );

    // ------  이용약관 렌더링 ------
    paymentWidget.renderAgreement('#agreement');

    paymentWidgetRef.current = paymentWidget;
    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) return;

    // ------ 금액 업데이트 ------
    paymentMethodsWidget.updateAmount(finalPrice);
  }, [finalPrice]);

  // ------ 토스 위젯 끝 ------

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const paymentWidget = paymentWidgetRef.current;

    try {
      // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
      await paymentWidget?.requestPayment({
        orderId: nanoid(), // 21바이트 uid 생성
        orderName: items[0].name + '외 ' + (items.length - 1) + '건',
        customerName: values.name,
        customerEmail: values.email,
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
      });
    } catch (err) {
      console.error('err', err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col gap-2 items-center p-24">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
          <div className="flex flex-col gap-2 items-center w-[1200px]">
            {/* 주문 상품 정보 영역 */}
            <OrderItems items={items} form={form} />
            <div className="flex gap-2 ">
              {/* 배송 정보 영역 */}
              <OrderInfomation form={form} />

              {/* 결제 관련(쿠폰, 포인트 포함) */}
              <PaymentInformation
                point={point}
                coupons={coupons}
                totalPrice={totalPrice}
                form={form}
                finalPrice={finalPrice}
                setFinalPrice={setFinalPrice}
              />
            </div>
          </div>
          <Card className="w-[35%]">
            <CardHeader>
              <CardTitle>결제 방법</CardTitle>
            </CardHeader>
            <CardContent>
              <div id="payment-widget" className="w-[100%]" />
              <div id="agreement" className="w-[100%]" />
            </CardContent>
            <CardFooter className="flex-col">
              <Button className="w-[100%]">결제</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
}
