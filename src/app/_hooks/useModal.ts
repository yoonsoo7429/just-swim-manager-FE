import { MouseEvent, useState } from 'react';

export function useModal() {
  const [modal, setModal] = useState<boolean>(false);

  const showModal = () => {
    setModal(true);
  };

  const unshowModal = () => {
    setModal(false);
  };

  const hideModal = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();

    setModal(false);
  };

  return {
    modal,
    setModal,
    showModal,
    hideModal,
    unshowModal,
  };
}
