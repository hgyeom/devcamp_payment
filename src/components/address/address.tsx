'use client';
import Script from 'next/script';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '@radix-ui/react-label';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useState } from 'react';

declare global {
  interface Window {
    daum: any;
  }
}

interface IAddr {
  address: string;
  zonecode: string;
}

export default function Address({ form }: any) {
  const { setValue } = form;

  const onClickAddr = () => {
    new window.daum.Postcode({
      oncomplete: function (data: IAddr) {
        setValue('zonecode', data.zonecode);
        setValue('addr', data.address);
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
        <FormField
          control={form.control}
          name="zonecode"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-3 items-center">
                <FormLabel className="w-[15%] flex gap-1">
                  주소<p className="text-red-600">*</p>
                </FormLabel>
                <FormControl>
                  <Input
                    id="zonecode"
                    className="w-[45%]"
                    placeholder="우편번호"
                    onClick={onClickAddr}
                    readOnly
                    {...field}
                  />
                </FormControl>
                <Button type="button" onClick={onClickAddr}>
                  검색
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addr"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-3 items-center">
                <FormLabel className="w-[15%]" />
                <FormControl>
                  <Input
                    id="addr"
                    className="w-[62%]"
                    placeholder="주소"
                    onClick={onClickAddr}
                    readOnly
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addrDetail"
          render={({ field }) => (
            <FormItem className="flex gap-3 items-center">
              <FormLabel className="w-[15%]" />
              <FormControl>
                <Input
                  id="addrDetail"
                  className="w-[62%]"
                  placeholder="나머지 주소"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        async
      />
    </>
  );
}
