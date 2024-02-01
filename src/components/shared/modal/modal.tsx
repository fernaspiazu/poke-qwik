import {
  type PropFunction,
  Slot,
  component$,
  useStylesScoped$,
  $,
} from "@builder.io/qwik";
import ModalStyles from "./modal.css?inline";

interface Props {
  showModal: boolean;
  closeFn: PropFunction<() => void>;
}

export const Modal = component$(({ showModal, closeFn }: Props) => {
  useStylesScoped$(ModalStyles);

  const closeModalWhenClickedOutside = $((event: PointerEvent) => {
    const element = event.target as HTMLDivElement;
    if (element.id === "modal-content") {
      closeFn();
    }
  });

  return (
    // hidden https://www.section.io/engineering-education/creating-a-modal-dialog-with-tailwind-css/
    <div
      id="modal-content"
      onClick$={closeModalWhenClickedOutside}
      class={showModal ? "modal-background" : "hidden"}
    >
      <div class="modal-content">
        <div class="mt-3 text-center">
          <h3 class="modal-title">
            <Slot name="title" />
          </h3>

          <div class="mt-2 px-7 py-3">
            <div class="modal-content-text">
              <Slot name="content" />
            </div>
          </div>

          <div class="items-center px-4 py-3">
            <button id="ok-btn" onClick$={closeFn} class="modal-button">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
