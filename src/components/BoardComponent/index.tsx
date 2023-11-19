import { Component, createSignal, onMount } from "solid-js";
import styles from "./styles.module.css";
import ButtonsComponent from "../ButtonsComponent";

const BoardComponent: Component = () => {
  const [grabbingBoard, setGrabbingBoard] = createSignal<boolean>(false);
  const [scale, setScale] = createSignal<number>(1);
  const [clickedPosition, setClickedPosition] = createSignal<{
    x: number;
    y: number;
  }>({ x: -1, y: -1 });
  const [selectedNode, setSelectedNode] = createSignal<string | null>(null);

  onMount(() => {
    const boardElement = document.getElementById("board");

    if (!boardElement) return;

    boardElement.addEventListener(
      "wheel",
      (e) => {
        setScale(scale() + e.deltaY * -0.005);

        setScale(Math.min(Math.max(1, scale()), 2));

        boardElement.style.transform = `scale(${scale()})`;
        boardElement.style.marginTop = `${(scale() - 1) * 50}vh`;
        boardElement.style.marginLeft = `${(scale() - 1) * 50}vw`;
      },
      { passive: false }
    );
  });

  function handleOnMouseDownBoard(e: MouseEvent) {
    setGrabbingBoard(true);
    setClickedPosition({ x: e.x, y: e.y });
  }

  function handleOnMouseUpBoard(e: MouseEvent) {
    setClickedPosition({ x: -1, y: -1 });
    setGrabbingBoard(false);
  }
  function handleOnMouseMove(e: MouseEvent) {
    if (clickedPosition().x >= 0 && clickedPosition().y >= 0) {
      const deltaX = e.x - clickedPosition().x;
      const deltaY = e.y - clickedPosition().y;

      const boardWrapperElement = document.getElementById("boardWrapper");
      if (boardWrapperElement) {
        boardWrapperElement.scrollBy(-deltaX, -deltaY);
        setClickedPosition({ x: e.x, y: e.y });
      }
    }
  }

  function handleOnClickAdd(numberInputs: number, numberOutputs: number) {}

  function handleOnClickDelete() {}

  return (
    <div id="boardWrapper" class={styles.wrapper}>
      <ButtonsComponent
        showDelete={selectedNode() !== null}
        onClickAdd={handleOnClickAdd}
        onClickDelete={handleOnClickDelete}
      />
      <div
        id="board"
        class={grabbingBoard() ? styles.boardDragging : styles.board}
        onMouseDown={handleOnMouseDownBoard}
        onMouseUp={handleOnMouseUpBoard}
        onMouseMove={handleOnMouseMove}
      ></div>
    </div>
  );
};

export default BoardComponent;
