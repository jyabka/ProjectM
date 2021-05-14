

const initialState = {
  components: {}
};

const mobsReducer = (state = initialState, { type, payload }) => {



  switch(type) {

    case 'MOB_MOVEMENT':
