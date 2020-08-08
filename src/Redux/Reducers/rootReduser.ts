// ==== Typescript ====
interface InitialStateInterface {}

interface ActionInterface {
  type: string;
  payload: number;
}

// ==== Initital state ====
const initialState: InitialStateInterface = {};

// ==== Reducer
export default (state = initialState, { type, payload }: ActionInterface) => {
  switch (type) {
    default:
      return state;
  }
};
