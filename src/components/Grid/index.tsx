import style from "./styles.module.scss";

export function Grid() {
  return (
    <>
      <div className={style.gridContainer}>
        <img src="" />

        <div className="descriptions">
          <span>Name</span>
          <button>Add to cart</button>
        </div>
      </div>
    </>
  );
}
