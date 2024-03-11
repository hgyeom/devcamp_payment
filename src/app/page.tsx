import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import Address from '@/components/address/address';
import { Checkbox } from '@/components/ui/checkbox';

const items = [
  {
    img: '/banana.jpg',
    name: '바나나',
    price: 1400,
    count: 1,
    total: 1400,
  },
  { img: '/tomato.jpg', name: '토마토', price: 800, count: 2, total: 1600 },
  { img: '/gaji.jpg', name: '가지', price: 500, count: 4, total: 2000 },
];

const point = 2000;
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-2 items-center p-24">
      {/* 주문 상품 정보 영역 */}
      <Card className="w-[1000px]">
        <CardHeader>
          <CardTitle>주문 상품</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">상품</TableHead>
                <TableHead>가격</TableHead>
                <TableHead>수량</TableHead>
                <TableHead className="text-right">총계</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.name}>
                  <TableCell className="font-medium gap-3">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.img} alt="상품" width={80} height={50} />
                      <span className="text-center">{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.price} ₩</TableCell>
                  <TableCell>{item.count} 개</TableCell>
                  <TableCell className="text-right">{item.total} ₩</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 배송 정보 영역 */}
      {/* react-hook-form으로 교체하기 */}
      <div className="flex gap-2 w-[1000px]">
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
        <Card className="w-[500px]">
          {/* 쿠폰, 포인트 영역 */}
          <CardHeader>
            <CardTitle>쿠폰 & 포인트</CardTitle>
          </CardHeader>
          <CardContent>
            <Label>쿠폰</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="쿠폰을 선택하세요." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1000">1000</SelectItem>
                <SelectItem value="2000">2000</SelectItem>
                <SelectItem value="5%">5%</SelectItem>
              </SelectContent>
            </Select>
            <div>
              <Label>포인트</Label>
              <div className="flex gap-3">
                <Input className="w-[180px]" />
                <Button>전액 사용</Button>
              </div>
              <Label>
                보유 포인트 <b>{point}</b>
              </Label>
            </div>
          </CardContent>

          {/* 결제 영역 */}
          <CardHeader>
            <CardTitle>결제 방법</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Button
                  role="radio"
                  className="aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 peer sr-only"
                />
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/card.svg" alt="카드" width={20} height={14} />
                  카드
                </Label>
              </div>
              <div>
                <Button
                  role="radio"
                  className="aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 peer sr-only"
                />
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/card.svg" alt="카드" width={20} height={14} />
                  가상계좌
                </Label>
              </div>
              <div>
                <Button
                  role="radio"
                  className="aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 peer sr-only"
                />
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
      </div>
    </main>
  );
}

// grid grid-cols-3 gap-4
