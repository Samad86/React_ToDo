import React from "react";
import classNames from "classnames";
import axios from "axios";

import Badge from "../Badge";

import removeSvg from "../../assets/img/remove.svg";

import "./List.scss";

const List = ({
  items,
  isRemovable,
  onClick,
  onRemove,
  onClickItem,
  activeItem,
}) => {
  // onClickItem - клик по задаче в списке задач для ее отображения справа
  // на каждой итерации передаем item в функцию removeList и далее в компонент App
  const removeList = (item) => {
    if (window.confirm("Вы действительно хотите удалить задачу?")) {
      axios.delete("http://localhost:3001/lists/" + item.id).then(() => {
        onRemove(item.id); // если удаление прошло успешно, то выполняется функция onRemove
      });
    }
  };

  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, {
            active: item.active
              ? item.active
              : activeItem && activeItem.id === item.id,
          })} // если activeItem не null и id задачи в списке (item.id) совпал с id активной (выбранной) задачи (activeItem.id), то ставим класс active
          onClick={onClickItem ? () => onClickItem(item) : null}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>
            {item.name}
            {item.tasks && ` (${item.tasks.length}) `}
          </span>
          {isRemovable && (
            <img
              className="list__remove-icon"
              src={removeSvg}
              alt="remove_icon"
              onClick={() => removeList(item)}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;
