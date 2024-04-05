import styles from './Button.module.css'

function Button({ text, width, height, type = null, disabled = false }) {
  return (
    <button
      disabled={disabled}
      className={styles.container}
      style={{ width: `${width}px`, height: `${height}px` }}
      type={`${type}`}
    >
      <h2>{text}</h2>
    </button>
  )
}

export default Button
