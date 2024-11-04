import { CSSProperties } from "react";
import styles from "./circular-loading.module.css";

const CircularLoading = ({
  width,
  color,
  thickness,
  style,
}: {
  width?: string | number;
  color?: string;
  thickness?: number;
  style?: CSSProperties;
}) => {
  return (
    <svg
      viewBox="25 25 50 50"
      width={width ? width : "2rem"}
      className={styles.container}
      style={style}
    >
      <circle
        r="20"
        cy="50"
        cx="50"
        strokeWidth={thickness ? thickness : 2}
        stroke={color ? color : "hsl(214, 97%, 59%)"}
        className={styles.inner__circle}
      ></circle>
    </svg>
  );
};

export default CircularLoading;
