'use client';

import { useEffect, useState, useCallback } from 'react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const PaymentInformation = ({ point, coupons, totalPrice }: any) => {
  const [usedPoint, setUsedPoint] = useState(0);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const [finalPrice, setFinalPrice] = useState(totalPrice);

  // 계산을 위한 가격.
  const calculPrice = totalPrice;

  // 쿠폰 할인율 계산
  const calculateCouponDiscount = (coupon: any) => {
    if (!coupon) return 0;

    if (coupon.discountType === 'percent') {
      const discountPercentage = parseFloat(coupon.discountValue) || 0;
      return (totalPrice * discountPercentage) / 100;
    } else {
      return parseFloat(coupon.discountValue) || 0;
    }
  };

  useEffect(() => {
    // 선택된 쿠폰이 없으면
    if (!selectedCoupon) return;

    const couponDiscount = calculateCouponDiscount(selectedCoupon);

    // 쿠폰 할인
    const remainingPriceAfterCoupon = totalPrice - couponDiscount;

    // 포인트 할인
    const calculatedFinalPriceAfterPoint =
      remainingPriceAfterCoupon - usedPoint;

    // 최종 가격
    const finalPrice = Math.max(calculatedFinalPriceAfterPoint, 0);
    const maxUsablePoint = Math.min(point, remainingPriceAfterCoupon);

    setUsedPoint(Math.min(usedPoint, maxUsablePoint));
    setFinalPrice(finalPrice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usedPoint, selectedCoupon, totalPrice]);

  // 포인트 전액 사용
  const handleUseAllPoints = useCallback(() => {
    // 최종 결제 금액이 0원이면
    if (finalPrice === 0) return;

    // NaN값 검사를 위해
    const parsedValue = parseFloat(point.toString());
    if (!isNaN(parsedValue)) {
      // 사용 가능한 포인트 계산(보유 포인트, 최종 결제 금액중 작은 수)
      const maxUsablePoint = Math.min(parsedValue, calculPrice);
      setUsedPoint(maxUsablePoint);
    } else {
      // 만약 파싱에 실패하면 기본값인 0으로 설정(string값 계산을 위해(포인트를 모두 지우면 빈 문자열이 됨.))
      setUsedPoint(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [point, finalPrice]);

  // 포인트 입력
  const handleChangePoint = (e: any) => {
    let inputValue = e.target.value;
    if (inputValue === '') {
      setUsedPoint(0);
    } else {
      const maxUsablePoint =
        calculPrice - inputValue > 0 ? inputValue : calculPrice;

      setUsedPoint(maxUsablePoint);
    }
  };

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>쿠폰 & 포인트</CardTitle>
      </CardHeader>
      <CardContent>
        <Label>쿠폰</Label>
        <Select onValueChange={(value) => setSelectedCoupon(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="쿠폰을 선택하세요." />
          </SelectTrigger>
          <SelectContent>
            {coupons.map((coupon: any) =>
              coupon.status === 'notUsed' ? (
                <SelectItem
                  key={coupon.code}
                  value={coupon}
                  data-discountvalue={coupon.discountValue}
                  title={coupon.discountType}
                >
                  {coupon.name}
                </SelectItem>
              ) : null
            )}
          </SelectContent>
        </Select>
        <Label>포인트</Label>
        <div>
          <div className="flex gap-3">
            <Input
              id="pointInput"
              className="w-[180px]"
              value={usedPoint}
              onChange={(e) => handleChangePoint(e)}
            />
            <Button onClick={handleUseAllPoints}>전액 사용</Button>
          </div>
          <Label>
            보유 포인트 <b>{point}</b>
          </Label>
        </div>
      </CardContent>
      <CardHeader className="gap-2">
        <CardTitle>결제 금액</CardTitle>
        <Label>상품 가격 : {totalPrice}원</Label>
        <Label>쿠폰 할인 : - {calculateCouponDiscount(selectedCoupon)}원</Label>
        <Label>포인트 사용 : - {usedPoint}원</Label>
        <Label>최종 결제 금액 : {finalPrice}원</Label>
      </CardHeader>
      <CardHeader>
        <CardTitle>결제 방법</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Button className="aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 peer sr-only" />
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/card.svg" alt="카드" width={20} height={14} />
              카드
            </Label>
          </div>
          <div>
            <Button className="aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 peer sr-only" />
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/card.svg" alt="카드" width={20} height={14} />
              가상계좌
            </Label>
          </div>
          <div>
            <Button className="aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 peer sr-only" />
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/card.svg" alt="카드" width={20} height={14} />
              무통장
            </Label>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col">
        <div>
          <Checkbox id="cashreceipts" />
          <Label htmlFor="cashreceipts">현금영수증 신청</Label>
        </div>
        <Button className="w-[100%]">결제</Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentInformation;
