import { Component, createSignal, onCleanup } from "solid-js";
import styles from "./styles.module.css";
import { FiTrash2 } from "solid-icons/fi";
import { FaSolidPlus } from "solid-icons/fa";

function clickOutside(el: any, accessor: any) {
  const onClick = (e: MouseEvent) => !el.contains(e.target) && accessor()?.();
  document.body.addEventListener("click", onClick);

  onCleanup(() => document.body.addEventListener("click", onClick));
}

interface ButtonProps {
  showDelete: boolean;
  onClickAdd: (numberInputs: number, numberOutputs: number) => void;
  onClickDelete: () => void;
}

const ButtonsComponent: Component<ButtonProps> = (props: ButtonProps) => {
  const [isOpen, setIsOpen] = createSignal<boolean>(false);
  const [numberInputs, setNumberInputs] = createSignal<number>(0);
  const [numberOutputs, setNumberOutputs] = createSignal<number>(0);

  function handleOnClickAdd(e: any) {
    e.stopPropagation();
    setIsOpen(true);
  }

  function handleClickAddNode(e: MouseEvent) {
    e.stopPropagation();

    if (
      numberInputs() > 4 ||
      numberInputs() < 0 ||
      numberOutputs() > 4 ||
      numberOutputs() < 0
    )
      return;

    setIsOpen(false);
    props.onClickAdd(numberInputs(), numberOutputs());
    setNumberInputs(0);
    setNumberOutputs(0);
  }
  function handleChangeNumberInputs(e: any) {
    setNumberInputs(e.target.value);
  }
  function handleChangeNumberOutputs(e: any) {
    setNumberOutputs(e.target.value);
  }

  function handleClickOutsideDropdown() {
    setIsOpen(false);
    setNumberInputs(0);
    setNumberOutputs(0);
  }

  return (
    <div class={styles.wrapper}>
      <button
        class={
          props.showDelete ? styles.buttonDelete : styles.buttonDeleteHidden
        }
        onClick={props.onClickDelete}
      >
        <FiTrash2 />
      </button>
      <button class={styles.buttonAdd} onClick={handleOnClickAdd}>
        <FaSolidPlus />
      </button>

      <div
        class={isOpen() ? styles.dropdown : styles.dropdownHidden}
        use:clickOutside={handleClickOutsideDropdown}
      >
        <label class={styles.label}>Number of Inputs</label>
        <input
          class={styles.input}
          type="number"
          value={numberInputs()}
          onInput={handleChangeNumberInputs}
        />
        <label class={styles.label}>Number of Outputs</label>
        <input
          class={styles.input}
          type="number"
          value={numberOutputs()}
          onInput={handleChangeNumberOutputs}
        />
        <button class={styles.buttonRect} onClick={handleClickAddNode}>
          Add Node
        </button>
      </div>
    </div>
  );
};

export default ButtonsComponent;
