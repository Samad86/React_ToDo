import React from "react";
import classNames from "classnames";

import "./Badge.scss";

const Badge = ({ color, onClick, className }) => (
  <i
    onClick={onClick}
    className={classNames("badge", { [`badge--${color}`]: color }, className)} // если есть color, то применяется класс .badge--${color}
  ></i>
);

export default Badge;
