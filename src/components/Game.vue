<template>
  <div class="main">
    <div class="game" :class="{hid: over}">
      <div class="table">
        <div v-for="(worker, index) in $store.state.workerList" :key="index" :class="{disabled: worker.days <= 0, worker: true, success: worker.success, failure: worker.failure}">
          <div class="stats">
            <Icon image="star" color="#f1c232" :text="worker.work"></Icon>
            <Icon image="circle" color="#f1c232" :text="worker.days"></Icon>
          </div>
          <img :class="{portrait: true, block: true}" :src="`face${index+1}.svg`" :data-worker-id="worker.id">
        </div>
      </div>
      <div class="screen block">
        <div class="pad">
          <transition-group name="list" tag="div">
            <div class="draggable" v-for="task in $store.state.taskQueue" :key="task.id" :data-task-id="task.id">
              <div class="task">
                <Icon image="star" color="#000000" :text="task.work"></Icon>
                <Icon image="circle" color="#000000" :text="task.days"></Icon>
                <div class="name">{{task.name}}</div>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
      <transition name="question" tag="div">
        <div class="question" v-if="question">
          <div class="image" v-if="question.image" :style="{backgroundImage: `url(${question.image})`}"></div>
          <div class="text">
            <div>{{question.text}}</div>
            <div class="answers">
              <div class="button" v-for="answer in question.answerList" :key="answer.id" @click="answerQuestion(question, answer)">
                {{answer.text}}
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div class="score">Счёт:<div class="number">{{this.score}}</div></div>
    </div>
    <transition name="gameover" tag="div">
      <div class="gameover" v-if="over && step > 1">
        <div class="score"><div>Счёт:</div><div class="number">{{this.score}}</div> из <div class="number">{{total}}</div></div>
        <div class="restart button" @click="restart">Начать заново</div>
      </div>
    </transition>
    <tutorial @close="closeTutorial" v-if="!visited"></tutorial>
  </div>
</template>

<style scoped>
  * { outline: none; user-select: none; }
  .main { background: black; max-width: 450px; margin: 0 auto; }
  .score { display: flex; color: white; align-items: center; justify-content: center; color: rgba(255,255,255,1); font-family: "PT Sans"; margin: 5px 0; font-weight: bold; font-size: 20px; }
  .score .number { font-family: "Bree Serif"; margin: -4px 10px 0; font-size: 32px; }
  .table { padding: 10px; display: flex; flex-direction: row; justify-content: space-between; flex-wrap: wrap; }
  .table > div { display: flex; flex-direction: column; text-align: center; margin-bottom: 15px; }
  .portrait { border-radius: 50%; width: 96px; background: rgba(255,255,255,.25); margin: .5em; }
  .worker { transition: all .5s; }
  img { transition: all 1s; }
  .success img { background: rgb(0, 180, 0); }
  .failure img { background: red; }
  .disabled { filter: grayscale(100%); }
  .success, .failure { transform: scale(1.1); }
  
  .game { transition: all 1s; }
  .hid { opacity: 0; }

  .gameover { display: flex; font-family: "PT Sans"; align-items: center; flex-direction: column; justify-content: center; top: 0; bottom: 0; left: 0; right: 0; background: white; position: fixed; opacity: 1; transition-duration: 1s; transition-delay: 2s; }
  .gameover * { color: black; }

  .restart { margin-bottom: 20px; }

  .gameover-enter { opacity: 0; }

  .stats { display: flex; align-items: center; justify-content: center; }

  .screen { padding: 0 10px; }
  .pad { display: flex; flex-direction: column; }
  .task { cursor: grab; background: white; border-radius: 5px; margin-bottom: 5px; padding: 5px 22px 5px; display: flex; align-items: center; font-family: "Bad Script"; font-weight: bold; }
  .task .name { margin-left: 7px; margin-bottom: -3px; }
  .draggable-mirror .task { transition: all .5s; background: white; box-shadow: 0 0 20px rgba(0,0,0,.5); opacity: 1; transform: rotate(3deg); }
  .draggable-mirror .task .name { padding-right: 10px; }
  .draggable-source--is-dragging .task { opacity: .25; }
  .draggable-container--over.portrait { background: rgba(255,255,255,.75); }
  .disabled .draggable-container--over.portrait { background: rgba(255,255,255,.25); }

  .list-leave-active .task { opacity: .25; }
  .list-leave { opacity: .25; }
  .list-enter-active { transition: opacity 1s 1s; }
  .list-leave-active { transition: all 1s; position: absolute; }
  .list-enter, .list-leave-to { opacity: 0; }
  .list-move { transition: all .5s .5s; }

  .gameover { color: white; }

  .question { font-family: "PT Sans"; line-height: 1.1; overflow: scroll; font-size: 24px; background: white; box-shadow: 0 0 50px 20px black; position: fixed; left: 0; right: 0; bottom: 0; box-sizing: border-box; top: 0; transition: all 1s cubic-bezier(0.77, 0, 0.175, 1); overflow: hidden; transform: translateY(20vh); }
  .question .image { padding: 0; width: 100%; height: 50%; background-size: cover; background-position: center; background-repeat: no-repeat; }
  /* .question > * { padding: 10px; } */
  .question .text { background: white; width: 100%; text-align: center; padding: 20px; }
  .question .answers { padding: 20px; display: flex; justify-content: center; font-size: 18px; }
  .button { display: inline-block; margin: 0 10px; color: black; padding: 5px 10px; transition: all .1s; background: #f1c232; border: 2px solid #614e14; box-shadow: 3px 3px 0 0 #614e14; border-radius: 100px; }
  .button:active { box-shadow: none; transform: translate(3px, 3px); background: #e2b630; }

  .question-enter-active { transform: translateY(120vh); }
  .question-leave-active { transform: translateY(120vh); }
</style>

<script>
  import { Draggable, Droppable } from '@shopify/draggable'
  import { mapGetters } from "vuex"
  import Cookies from 'js-cookie'

import {store} from "../store.js"

  import Icon from "./Icon.vue"
  import Tutorial from "./Tutorial.vue"

  export default {
    name: 'Game',
    components: { Icon, Tutorial, Draggable, Droppable },
    data: () => {
      return {
        question: false,
        gameover: false,
        visitedSession: false,
      }
    },
    computed: {
      ...mapGetters({
        score: "score",
      }),
      step() {
        return store.state.step
      },
      over() {
        return store.state.taskQueue.length <= 0;
      },
      visited() {
        return this.visitedSession || Cookies.get("visited")
      },
      total() {
        return store.state.moveList.map(x => {
          let t = x.taskQueue.filter((y) => {return y.selected})[0];
          return t.work * t.days
        }).reduce((acc, x) => { return acc + x }, 0)
      },
    },
    watch: {
      step(oldStep, newStep) {
        if (newStep % 4 == 0) {
          this.question = store.getters.questionListGet
        }
      },
    },
    mounted() {
      store.commit("taskQueuePopulate");
      const draggable = new Draggable(document.querySelectorAll(".block"), {
        draggable: ".draggable",
        delay: 0,
      });
      draggable.on("mirror:destroy", (event) => {
        let taskId = event.data.mirror.dataset.taskId;
        let workerId = event.data.sensorEvent.data.target.dataset.workerId;
        store.commit("workerListSelect", {workerId, taskId});
        store.commit("taskQueuePopulate");
      })
    },
    methods: {
      answerQuestion(question, answer) {
        store.commit("answerSubmit", {question, answer});
        setTimeout(() => {this.question = false}, 750);
      },
      restart() {
        location.reload()
      },
      closeTutorial() {
        this.visitedSession = true;
        Cookies.set("visited", "true")
      },
    }
  }
</script>