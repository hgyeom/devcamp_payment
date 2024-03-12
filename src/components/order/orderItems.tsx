import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

const OrderItems = ({ items }: any) => (
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
          {items.map((item: any) => (
            <TableRow key={item.name}>
              <TableCell className="font-medium gap-3">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.img} alt="상품" width={60} height={60} />
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
);

export default OrderItems;
