import moment from 'moment';
import { atom } from 'recoil';
const currentDate = moment().format('YYYY-MM-DD');
const dateState = atom({
  key: 'dateState',
  default: {
    startDate: currentDate,
    endDate: currentDate,
  },
});
const userState = atom<number>({
  key: 'useState',
  default: 1,
});

export { dateState, userState };
