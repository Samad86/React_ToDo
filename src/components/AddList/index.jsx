import React, { useState, useEffect } from "react";
import axios from "axios";

import List from "../List";
import Badge from "../Badge";

import closeSvg from "../../assets/img/close.svg";

import "./AddList.scss";

const AddList = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, selectColor] = useState(3); // в selectedColor хранится id цвета (color.id). Начальное значение - colors[0].id (изначально выбран первый цвет - 0й элемент массива). Если null, то изначально не будет выбран ни один цвет
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState(""); // При клике на "Добавить папку" открывается popup окно. Введенное значение добавляется в список задач. В переменной inputValue хранится значение, которок мы вводим в поле input в popup окне. Начальное значение - "", т.к. изначально поле input пустое

  useEffect(() => {
    if (Array.isArray(colors)) {
      selectColor(colors[0].id); // если colors является массивом, то берем первый элемент и вытаскиваем из него id, и применяем этот цвет выбранным цветом по умолчанию
    }
  }, [colors]);

  const onClose = () => {
    // после добавления задачи popup окно закрывается, поле input очищается и цвет снова возвращается к начальному значению (выбран первый цвет)
    setVisiblePopup(false);
    setInputValue("");
    selectColor(colors[0].id);
  };

  const addList = () => {
    if (!inputValue) {
      alert("Введите название задачи");
      return;
    }
    setIsLoading(true);
    axios
      .post("http://localhost:3001/lists", {
        name: inputValue,
        colorId: selectedColor,
      })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === selectedColor)[0];
        const listObj = { ...data, color, tasks: [] };
        onAdd(listObj);
        onClose(); // закрытие popup окна после добавления новой задачи в список
      })
      .catch(() => {
        alert("Ошибка при добавлении задачи!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(true)}
        items={[
          {
            className: "list__add-button",
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: "Добавить задачу",
          },
        ]}
      />

      {visiblePopup && (
        <div className="add-list__popup">
          <img
            onClick={onClose}
            className="add-list__popup-close-btn"
            src={closeSvg}
            alt="close_button"
          />

          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} // событие - изменение поля input (ввод какого-то текста задачи). Введенный текст берется из e.target.value, добавляется в состояние setInputValue и оно теперь будет в переменной inputValue
            className="field"
            type="text"
            placeholder="Название задачи"
          />

          <div className="add-list__popup-colors">
            {colors.map((color) => (
              <Badge
                onClick={() => selectColor(color.id)}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && "active"} // если выбранный цвет (selectedColor) соответствует id цвета из массива color (color.id) (условие selectedColor === color.id является true), то добавляется класс .active
              />
            ))}
          </div>

          <button onClick={addList} className="button">
            {isLoading ? "Добавление..." : "Добавить"}
          </button>
        </div> // ссылка на функцию addList; при клике на кнопку будет вызываться функция addList
      )}
    </div>
  );
};

export default AddList;
