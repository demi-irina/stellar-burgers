import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { Modal } from '../modal';
import { OrderInfo } from '../order-info';

type TOrderInfoModalProps = {
  onClose: () => void;
};

export const OrderInfoModal: FC<TOrderInfoModalProps> = ({ onClose }) => {
  const { number } = useParams<{ number: string }>();

  return (
    <Modal title={number || ''} onClose={onClose}>
      <OrderInfo />
    </Modal>
  );
};
