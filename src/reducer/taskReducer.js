const initialState = {
  dataTaskDetail: [],
  moviesList: null,
  bookingList: [],
  taskId: null,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "location":
      return { ...state, dataTaskDetail: action.cinemaCode };
    case "getTaskId":
      return { ...state, taskId: action.idTask };
    case "booking":
      const check = state.bookingList.findIndex(
        (chair) => chair.tenGhe === action.isBooking.tenGhe
      );
      console.log(check)
      if (check === -1) {
        const newChair = [...state.bookingList, { ...action.isBooking }];
        return { ...state, bookingList: newChair };
      }
      const newChair = state.bookingList.filter(
        (chair) => chair.tenGhe !== action.isBooking.tenGhe
      );
      return { ...state, bookingList: newChair, };
    case "remove":
      return { ...state, bookingList: [] };
    case "getMovieId":
      return { ...state, movieId: action.movie };
    default:
      return state;
  }
};

export default taskReducer;
