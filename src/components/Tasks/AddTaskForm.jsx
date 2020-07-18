import React, { useState } from "react";
import axios from "axios";

import addSvg from "../../assets/img/add.svg";

const AddTaskForm = ({ list, onAddTask }) => {
  const [formVisible, setFormVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const toggleFormVisible = () => {
    setFormVisible(!formVisible);
    setInputValue(""); // очистка текстового поля ввода при клике на "Добавить задачу" или "Отмена"
  };

  const addTask = () => {
    const obj = {
      // генерируем задачу (tasks в db.json)
      listId: list.id,
      text: inputValue,
      completed: false,
    };
    setIsLoading(true);
    axios
      .post("http://localhost:3001/tasks/", obj)
      .then(({ data }) => {
        onAddTask(list.id, data);
        toggleFormVisible();
      })
      .catch(() => {
        alert("Ошибка при добавлении задачи!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="tasks__form">
      {!formVisible ? (
        <div onClick={toggleFormVisible} className="tasks__form-new">
          <img src={addSvg} alt="add_icon" />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input
            value={inputValue}
            className="field"
            type="text"
            placeholder="Текст задачи"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button disabled={isLoading} onClick={addTask} className="button">
            {isLoading ? "Добавление..." : "Добавить задачу"}
          </button>
          <button onClick={toggleFormVisible} className="button button--gray">
            Отмена
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;
