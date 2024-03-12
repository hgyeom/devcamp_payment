import Address from '../address/address';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function OrderInfomation() {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>주문자</CardTitle>
      </CardHeader>
      <CardContent className="gap-3 flex flex-col">
        <div className="flex gap-3 items-center">
          <Label className="w-[80px]">이름</Label>
          <Input className="w-[60%]" />
        </div>

        <div className="flex gap-3 items-center">
          <Label className="w-[80px]">이메일</Label>
          <Input className="w-[60%]" />
        </div>
        <div className="flex gap-3 items-center">
          <Label className="w-[80px]">전화번호</Label>
          <Input className="w-[60%]" />
        </div>
      </CardContent>
      <Address />
    </Card>
  );
}
