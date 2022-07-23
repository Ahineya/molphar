export const createModalsSlice = (set, get) => {

  return {
    modals: [],
    lastX: window.innerWidth / 2 - 340 / 2,
    lastY: 56 + 20,

    showModal({
      name,
      element,
      header,
      x,
      y,
    }) {
      if (get().modals.find(modal => modal.name === name)) {
        set(state => ({
          ...state,
          modals: state.modals.map(modal => {
            if (modal.name === name) {
              return {
                ...modal,
                element,
                header,
                x,
                y,
              };
            }

            return modal;
          })
        }));

        return;
      }

      set(state => ({
        ...state,
        modals: [
          ...state.modals,
          {
            name,
            element,
            header,
            x,
            y,
          }
        ]
      }));
    },

    hideModal(name) {
      set(state => ({
        ...state,
        modals: [
          ...state.modals.filter(modal => modal.name !== name)
        ]
      }));
    },
    
    hideAllModals() {
      set(state => ({
        ...state,
        modals: []
      }));
    },

    moveModal(name, x, y) {
      set(state => ({
        ...state,
        modals: [
          ...state.modals.map(modal => {
            if (modal.name === name) {
              return {
                ...modal,
                x,
                y,
              }
            }
            return modal;
          }),
        ],
        lastX: name === 'elementSettings' ? x : state.lastX,
        lastY: name === 'elementSettings' ? y : state.lastY,
      }));
    }
  }
}
