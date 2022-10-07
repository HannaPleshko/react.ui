import { FC } from 'react';
import Item from './Item';
import ItemForm from './ItemForm';

interface IItemsListProps {
  label?: string;
  items: string[];
  setItems: (items: string[]) => void;
}

const ItemsList: FC<IItemsListProps> = ({ label, items, setItems }) => {
  const addItem = (userInput: string) => {
    if (userInput.trim() && !items.some((item) => item === userInput)) {
      setItems([...items, userInput]);
    }
  };

  const removeItem = (userInput: string) => {
    setItems([...items.filter((item) => item !== userInput)]);
  };

  const editItem = (userInput: string, oldItem: string) => {
    if (userInput.trim() && !items.some((item) => item === userInput)) {
      setItems([...items.map((item) => (item === oldItem ? userInput : item))]);
    }
  };

  return (
    <>
      <ItemForm addItem={addItem} label={label} />
      {items.map((item) => {
        return <Item item={item} key={item} removeItem={removeItem} editItem={editItem} />;
      })}
    </>
  );
};

export default ItemsList;
