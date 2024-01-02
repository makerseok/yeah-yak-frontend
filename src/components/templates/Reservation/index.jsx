import { useState } from 'react';
import Button from '@atoms/Button';
import { FlexContainer } from '@atoms/Flex';
import Input from '@atoms/Input';
import Form from '@modules/Form';
import Modal from '@modules/Modal';
import { SERVER_HOST } from '@config/config';
import axios from 'axios';
import { useModalContext } from '@modules/Modal/ModalContext';

export default function Reservation({ values, onChange, onClose }) {
  const { modalOpen, openModal, closeModal } = useModalContext();
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state for tracking submission

  const handleSubmit = async e => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }
    if (!values.name || !values.phoneNumber) {
      return;
    }

    try {
      setIsSubmitting(true);
      // POST 요청을 보낼 데이터 생성
      const postData = {
        name: values.name,
        room: '1',
        phoneNumber: values.phoneNumber,
        startDate: values.startDate,
        endDate: values.endDate,
      };

      // axios를 사용하여 POST 요청 보내기
      const response = await axios.post(`http://${SERVER_HOST}/reservations`, postData);

      closeModal('reservation');
      onClose();

      // 추가로 필요한 작업 수행
    } catch (error) {
      // 오류 처리
      window.alert('서버에 문제가 발생했습니다. 관리자에게 문의해주세요.');
      console.error('Error submitting reservation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal modalId="reservation" title={'예약하기'} width={'80%'}>
      <Form submitHandler={handleSubmit}>
        <FlexContainer $noWrap $gap="0" $justifyContent="space-evenly">
          <Input type="date" label="시작일" value={values.startDate} onChange={onChange} readOnly />
          <Input type="date" label="종료일" value={values.endDate} onChange={onChange} readOnly />
        </FlexContainer>
        <FlexContainer $noWrap $gap="0" $justifyContent="space-evenly">
          <Input label="예약자명" name="name" value={values.name} onChange={onChange} />
          <Input label="전화번호" name="phoneNumber" value={values.phoneNumber} onChange={onChange} />
        </FlexContainer>
        <FlexContainer $justifyContent="flex-end">
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? '신청 중...' : '신청'}
          </Button>
        </FlexContainer>
      </Form>
    </Modal>
  );
}
