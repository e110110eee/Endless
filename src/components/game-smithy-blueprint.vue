<template>
  <div class="game-smithy-blueprint">
    <div class="blueprint" v-for="item in blueprintList">
      <div class="m-b-10" @click="showMore(item)">{{item.name}}</div>
      <transition enter-active-class="animated zoomIn">
      <div v-show="item.id === currentId">
        <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
          <div v-show="tip" class="tip">{{tip}}</div>
        </transition>
        <ul class="left">
          <li>需要以下材料:</li>
          <li v-for="v in item.need">
            <div v-if="v.length > 2">
              <span class="name color-purple">{{v[2]}}</span>
              <span class="num color-green">{{v[1](hero)}}</span>
            </div>
            <div v-else>
              <span class="name color-purple">{{v[0] | itemKey('name')}}</span>
              <span class="num color-green">{{v[1]}}</span>
            </div>
          </li>
        </ul><!--
    --><ul class="right m-b-10">
          <li>合成结果:</li>
          <li v-for="v in item.synthetics">
            <div v-if="typeof v === 'number'">
              <span class="color-yellow">{{v | itemKey('name')}}</span>
            </div>
            <div v-else>
              <span class="color-yellow">{{v[0] | itemKey('name')}}</span>
            </div>
          </li>
        </ul>
        <div>
          <a class="btn" v-if="hero.isEnoughInPackage(item.need)" @click.stop="build(item)">打 造</a>
          <a class="btn disabled" v-else>无 法 打 造</a>
        </div>
      </div>
      </transition>
    </div>
  </div>
</template>

<script>
import BluePrint from '../js/blueprint';
import PGET from '../js/public-static-get'
import { GetRange, GetRandom } from '../js/public-random-range';

export default {
  data(){
    return {
      currentId : 0,
      tip: ''
    }
  },
  computed :{
    blueprintList : function(){
      return this.$store.state.HeroStore.hero.$blueprint.map(function(k){
        return PGET(k);
      });
    },
    hero : function(){
      return this.$store.state.HeroStore.hero;
    }
  },
  created(){
    console.log(this)
  },
  methods:{
    showMore (item){
      this.tip = '';
      this.currentId = this.currentId === item.id ? 0 : item.id;
    },
    build (item){
      this.tip = "";
      console.log(this.currentId,item);
      let result = BluePrint(item);
      if(result.success){
        this.tip = result.msg;
        setTimeout(() => {
          this.tip = '';
        }, 1000);
      }
    }
  }
}
</script>

<style scoped lang="less">
  .game-smithy-blueprint{
    color: white;
    position: relative;
    .blueprint{
      cursor: pointer;
      background: black;
      padding: 10px;
      margin-bottom: 6px;
      position: relative;
      overflow: hidden;
    }
    .btn{
      width: 100%;
    }
    li:first-child{
      font-size: 12px;
      padding-bottom: 4px;
    }
    .left,.right{
      display: inline-block;
      width: 50%;
    }
    .tip{
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0px;
      top: 0px;
      text-align: center;
      background: rgba(0,0,0,0.6);
      padding-top: 60px;
    }
  }
</style>
