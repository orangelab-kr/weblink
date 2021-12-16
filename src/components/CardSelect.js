import { Picker } from 'antd-mobile';
import { useEffect, useState } from 'react';
import { SettingItem } from '.';
import { Client, useToggle } from '..';

export const CardSelect = ({ value, onChange }) => {
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState([]);
  const [visible, setVisible] = useToggle(false);

  const getCards = () =>
    Client.get('/payments/cards').then(({ data }) => setCards(data.cards));

  useEffect(() => getCards(), []);
  useEffect(() => onChange && onChange(card[0]), [card, onChange]);
  useEffect(() => {
    if (value || cards.length <= 0) return;
    setCard([cards[0].cardId]);
  }, [cards, value]);

  return (
    <>
      <SettingItem onClick={setVisible(true)} title="카드 선택">
        {card && cards && cards.find((c) => c.cardId === card[0])?.cardName}
      </SettingItem>
      <Picker
        visible={visible}
        onClose={setVisible(false)}
        value={card}
        onConfirm={setCard}
        cancelText="취소"
        confirmText="선택"
        columns={[
          cards.map((card) => ({
            label: card.cardName,
            value: card.cardId,
          })),
        ]}
      />
    </>
  );
};
