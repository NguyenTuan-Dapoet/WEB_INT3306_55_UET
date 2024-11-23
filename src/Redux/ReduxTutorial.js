// import { createStore } from 'https://cdn.skypack.dev/redux';
const initialState = 0;

/*
store: lưu trữ state được quản lý bởi reducer
       có các phương thức: dispatch, subscribe, getState
- action: là obj chứa type để xử lý state
- dispatch: ném action vào store để reducer xử lý
- reduce: xử lý state khi nhận action.type
- subscribe: chạy callback khi state thay đổi
*/

//tự định nghĩa store - không cần import
function createStore(reducer) {
    let state = reducer(undefined, {});
    const subscribers = []; //mảng chứa các callback

    return {
        getState : () => state,

        //ném action vào store để reducer xử lý state theo action.type
        dispatch : (action) => {
            state = reducer(state, action); //xử lý state
            subscribers.forEach(subscriber => subscriber()); //chạy callback
        },

        //nhận callback làm tham số
        subscribe (subscriber) {
            subscribers.push(subscriber);
        }
    }
}

/*
reducer để xửa lý action khi được dispatch
state: state hiện tại 
action: obj chứa type để xử lý state
*/
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'DEPOSIT':
      return state + action.payload;
    case 'WITHDRAW':
      return state - action.payload;
    default:
      return state;
  }
}

//action trả về các obj
function actionDeposit(payload) {
    return {
        type: 'DEPOSIT',
        payload
    }
}
function actionWithdraw(payload) {
    return {
        type: 'WITHDRAW',
        payload
    }
}

//tạo store lưu biến, sử lý với reducer
const store = createStore(reducer);

let depositButton = document.getElementById('deposit');
let withdrawButton = document.getElementById('withdraw');
let output = document.getElementById('output');

//dispatch action khi bấm nút
depositButton.onclick = function() {
    store.dispatch(actionDeposit(100));
}

withdrawButton.onclick = function() {
    store.dispatch(actionWithdraw(100));
}

function render() {
    output.innerText = store.getState();
}

//callback khi store thay đổi
store.subscribe(()=> {
    render();
});

render();
