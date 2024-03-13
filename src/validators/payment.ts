import { z } from 'zod';

const phoneRegex = /^010\d{8}$/;

export const schema = z.object({
  name: z.string().min(1, { message: '이름을 입력해주세요.' }),
  email: z.string().email({ message: '올바른 이메일을 입력해주세요.' }),
  phone: z
    .string()
    .min(11, '연락처는 11자리여야 합니다.')
    .max(11, '연락처는 11자리여야 합니다.')
    .refine(
      (value) => phoneRegex.test(value),
      '010으로 시작하는 11자리 숫자를 입력해주세요'
    ),
  zonecode: z.string().min(1, { message: '우편번호를 입력해주세요.' }),
  addr: z.string().min(1, { message: '주소를 입력해주세요.' }),
  addrDetail: z.string(),
});
