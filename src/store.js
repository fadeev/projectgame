import Vue from 'vue'
import Vuex from 'vuex'

import remove from "lodash/remove"
import shuffle from "lodash/shuffle"
import cloneDeep from "lodash/cloneDeep"
import find from "lodash/find"

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    step: 1,
    taskQueue: [],
    moveList: [],
    workerList: [
      {id: 1, work: 1, days: 7, success: null, failure: null, selected: null},
      {id: 2, work: 3, days: 7, success: null, failure: null, selected: null},
      {id: 3, work: 2, days: 7, success: null, failure: null, selected: null},
      {id: 4, work: 6, days: 7, success: null, failure: null, selected: null},
      {id: 5, work: 5, days: 7, success: null, failure: null, selected: null},
      {id: 6, work: 4, days: 7, success: null, failure: null, selected: null},
    ],
    taskList: [
      {increase: false, success: null, selected: null, id: 1, name: "Найти помещение", work: 3, days: 5},
      {increase: false, success: null, selected: null, id: 2, name: "Найти сотрудников", work: 1, days: 2},
      {increase: false, success: null, selected: null, id: 3, name: "Купить оборудование", work: 6, days: 3},
      {increase: false, success: null, selected: null, id: 4, name: "Подготовить документы", work: 2, days: 2},
      {increase: false, success: null, selected: null, id: 5, name: "Вымыть полы", work: 3, days: 5},
      {increase: false, success: null, selected: null, id: 6, name: "Настроить кассовый аппарат", work: 1, days: 2},
      {increase: false, success: null, selected: null, id: 7, name: "Выпить кофе", work: 7, days: 3},
      {increase: false, success: null, selected: null, id: 8, name: "Почитать книжку", work: 2, days: 2},
      {increase: false, success: null, selected: null, id: 9, name: "Включить и выключить компьютер", work: 2, days: 2},
      {increase: false, success: null, selected: null, id: 10, name: "Выглянуть в окно", work: 8, days: 3},
      {increase: true, success: null, selected: null, id: 11, name: "Увеличить репутацию", work: 2, days: 0},
    ],
    questionList: [
      {
        id: 1,
        text: "Текст первого вопроса.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Rue_de_Rivoli_at_night%2C_Paris_August_2013.jpg/800px-Rue_de_Rivoli_at_night%2C_Paris_August_2013.jpg",
        answer: false,
        answerList: [
          {id: 1, text: "Ответ 1"},
          {id: 2, text: "Ответ 2"},
        ],
      },
      {
        id: 2,
        text: "Текст второго вопроса.",
        answer: false,
        answerList: [
          {id: 1, text: "Ответ 1"},
          {id: 2, text: "Ответ 2"},          
        ],
      },
      {
        id: 3,
        text: "Текст третьего вопроса.",
        answer: false,
        answerList: [
          {id: 1, text: "Ответ 1"},
          {id: 2, text: "Ответ 2"},          
        ],
      },
    ],
  },
  getters: {
    score: (state) => {
      return state.moveList.map(x => {
        return x.taskQueue.reduce((acc, y) => {
          return y.success ? acc + y.work * y.days : acc
        }, 0)
      }).reduce((acc, x) => {return acc + x}, 0)
    },
    step: (state) => {
      return state.moveList.length
    },
    taskQueueFindById: (state) => (id) => {
      return find(state.taskQueue, (t) => {
        return t.id == id
      })
    },
    workerListFindById: (state) => (id) => {
      return find(state.workerList, (w) => {
        return w.id == id
      })
    },
    questionListGet(state) {
      return state.questionList.filter((x) => {
        return x.answer == false
      })[0]
    },
  },
  mutations: {
    taskQueueRemoveById(state, id) {
      state.taskQueue = remove(state.taskQueue, (task) => {
        return task.id != id
      })
    },
    taskQueuePopulate(state) {
      shuffle(state.taskList);
      if (state.taskQueue.length < 3 && state.taskList.length > 0) {
        state.taskQueue.push(state.taskList.pop());
        this.commit("taskQueuePopulate");
      }
    },
    taskQueueFindById(state, id) {
      return find(state.taskQueue, (t) => {
        return t.id == id
      })
    },
    workerListFindById(state, id) {
      return find(state.workerList, (w) => {
        return w.id == id
      });
    },
    workerListSelect(state, {workerId, taskId}) {
      let task = this.getters.taskQueueFindById(taskId);
      let worker = this.getters.workerListFindById(workerId);
      if (task && worker && (worker.days > 0)) {
        if (worker.work >= task.work) {
          worker.success = true;
          task.success = true;
        } else {
          if (Math.random() < (10 - task.work) / 10) {
            worker.success = true;
            task.success = true;
          } else {
            worker.failure = true
            task.success = false;
          }
        }
        task.selected = true;
        worker.selected = true;
        state.moveList.push({
          workerList: cloneDeep(state.workerList),
          taskQueue: cloneDeep(state.taskQueue)
        });
        task.selected = null;
        worker.selected = null;
        task.success = null;
        task.increase ? worker.work += task.work : worker.days -= task.days;
        this.commit("taskQueueRemoveById", task.id)
        state.step++;
        setTimeout(() => {
          worker.success = worker.failure = null
        }, 2000)
      }
},
    answerSubmit(state, {question, answer}) {
      question.answer = answer;
    },
  },
})
