'use client';

import { useEffect, useState, useCallback } from 'react';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const PaymentInformation = ({
  point,
  coupons,
  totalPrice,
  finalPrice,
  setFinalPrice,
}: any) => {
  const [usedPoint, setUsedPoint] = useState(0);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);

  // 계산을 위한 가격.
  const calculPrice = totalPrice;

  // 쿠폰 할인율 계산
  const calculateCouponDiscount = (couponCode: number) => {
    if (!couponCode) return 0;

    const coupon = coupons[couponCode - 1];

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
  }, [usedPoint, selectedCoupon, totalPrice, point]);

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
        <Select
          onValueChange={(value) => {
            setSelectedCoupon(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="쿠폰을 선택하세요." />
          </SelectTrigger>
          <SelectContent>
            {coupons.map((coupon: any) =>
              coupon.status === 'notUsed' ? (
                <SelectItem key={coupon.code} value={coupon.code.toString()}>
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
            <Button type="button" onClick={handleUseAllPoints}>
              전액 사용
            </Button>
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
    </Card>
  );
};

export default PaymentInformation;
