'use client';
import Script from 'next/script';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '@radix-ui/react-label';

declare global {
  interface Window {
    daum: any;
  }
}

interface IAddr {
  address: string;
  zonecode: string;
}

export default function Address() {
  const onClickAddr = () => {
    new window.daum.Postcode({
      oncomplete: function (data: IAddr) {
        (document.getElementById('addr') as HTMLInputElement).value =
          data.address;
        (document.getElementById('zipNo') as HTMLInputElement).value =
          data.zonecode;
        document.getElementById('addrDetail')?.focus();
      },
    }).open();
  };

  return (
    <>
      <CardHeader>
        <CardTitle>배송정보</CardTitle>
      </CardHeader>
      <CardContent className="gap-3 flex flex-col">
        <div className="flex gap-3 items-center">
          <Label className="w-[80px] text-sm">우편번호</Label>
          <Input
            id="zipNo"
            type="text"
            readOnly
            className="w-[40%]"
            onClick={onClickAddr}
          />
          <Button onClick={onClickAddr}>검색</Button>
        </div>
        <div className="flex gap-3 items-center">
          <Label className="w-[80px] text-sm">주소</Label>
          <Input
            id="addr"
            type="text"
            readOnly
            onClick={onClickAddr}
            className="w-[80%]"
          />
        </div>
        <div className="flex gap-3 items-center">
          <Label className="w-[80px] text-sm">나머지 주소</Label>
          <Input id="addrDetail" type="text" className="w-[80%]" />
        </div>
      </CardContent>
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        async
      />
    </>
  );
}
