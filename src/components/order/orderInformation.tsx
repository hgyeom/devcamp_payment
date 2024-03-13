import Address from '../address/address';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

export default function OrderInfomation({ form }: any) {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>주문자</CardTitle>
      </CardHeader>
      <CardContent className="gap-3 flex flex-col">
        {/* <div className="flex gap-3 items-center">
          <Label className="w-[80px]">이름</Label>
          <Input name="name" className="w-[60%]" />
          <p className="text-red-500">* 필수</p>
        </div>
        <div className="flex gap-3 items-center">
          <Label className="w-[80px]">전화번호</Label>
          <Input name="phone" className="w-[60%]" />
          <p className="text-red-500">* 필수</p>
        </div> */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-3 items-center">
                <FormLabel className="w-[15%]">이름</FormLabel>
                <FormControl>
                  <Input
                    placeholder="이름을 입력해주세요."
                    className="w-[60%]"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-3 items-center">
                <FormLabel className="w-[15%]">이메일</FormLabel>
                <FormControl>
                  <Input
                    placeholder="hello@sparta-devcamp.com"
                    className="w-[60%]"
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-3 items-center">
                <FormLabel className="w-[15%]">전화번호</FormLabel>
                <FormControl>
                  <Input
                    placeholder="01000000000"
                    className="w-[60%]"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
      <Address form={form} />
    </Card>
  );
}
