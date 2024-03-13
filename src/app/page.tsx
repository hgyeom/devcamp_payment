'use client';
import OrderItems from '@/components/order/orderItems';
import OrderInfomation from '@/components/order/orderInformation';
import PaymentInformation from '@/components/payment/paymentInformation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from '@/validators/payment';
import { Form } from '@/components/ui/form';

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
const point = 2000;

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
    discountType: 'percent', // 퍼센트 할인
    discountValue: '10', // 할인 비율
    name: '10% 할인쿠폰',
    status: 'notUsed',
  },
];

export default function Home() {
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

  const onSubmit = (values: z.infer<typeof schema>) => {
    alert(JSON.stringify(values, null, 4));
  };

  return (
    <main className="flex min-h-screen flex-col gap-2 items-center p-24">
      {/* 주문 상품 정보 영역 */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 items-center"
        >
          <OrderItems items={items} form={form} />

          <div className="flex gap-2 w-[1000px]">
            {/* 배송 정보 영역 */}
            {/* react-hook-form으로 교체하기 */}
            <OrderInfomation form={form} />

            {/* 결제 관련(쿠폰, 포인트 포함) */}
            <PaymentInformation
              point={point}
              coupons={coupons}
              totalPrice={totalPrice}
              form={form}
            />
          </div>
        </form>
      </Form>
    </main>
  );
}
