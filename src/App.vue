<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { computed } from 'vue';
import { defineComponent} from 'vue';
import { useRouter } from 'vue-router';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { toRaw } from 'vue';
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import { watch } from 'vue';
import { ElNotification } from 'element-plus'
import config from '@/config.js';
const WebName = config.Website.name;
let NowTime = 0;
setInterval(updateTimeStamp, 1000);

const watermarkContent = ref(['Loading……']);
function updateTimeStamp() {
  NowTime = new Date().getTime();
  watermarkContent.value = ["BY PRINT", "内部版本 严禁外传", NowTime.toString()];
}
onMounted(() => {  
  const timer = setInterval(updateTimeStamp, 1000);
  onBeforeUnmount(() => {  
    clearInterval(timer);  
  });  
});  

import { useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();
const isCur = ref<number | null>(null);
document.title = '欢迎回来 - PRINT'
watch(
  () => route.path,
  (newValue, oldValue) => {
    if (newValue == "/Admin") {
      document.title = "后台管理";
    } else if (newValue == "/") {
      isCur.value = 1;
    } else if (newValue == "/fiProductBx" || newValue == "/fiProductBxDetail") {
      isCur.value = 2;
    } else if (newValue == "/stock" || newValue == "/stockDetail") {
      isCur.value = 4;
    } else {
      isCur.value = null;
    }
  }
);
function pingIPAndPort(ip, port) {
    var ws;
    var url = 'ws://' + ip + ':' + port;
    try {
        ws = new WebSocket(url);
        ws.onopen = function() {
            console.log('Connection opened to ' + url);
            ws.close();
        };
        ws.onerror = function(err) {
            console.log('心跳异常！');
            ElNotification({
              title: '严重错误',
              message: '服务器心跳异常，请检查网络连接！',
              type: 'error',
            });
            ElLoading.service({ fullscreen: true });
        };
    } catch (err) {
        console.log('WebSocket fAIled: ', err);
    }
}
//开启一个线程，每隔1秒定时检测服务是否在线
onMounted(() => {
    setInterval(() => {
        pingIPAndPort(window.location.hostname, window.location.port);
    }, 1000);
});
//(仅适用于电脑端)开启线程，实时检测用户的浏览器是否开启深色模式
const isDark = ref(false);
watch(
  () => isDark.value,
  (newValue, oldValue) => {
    if (newValue) {
      ElNotification({
        title: '提示',
        message: '检测到您已开启深色模式，可能会出现部分错误，建议关闭！',
        type: 'warning',
      })
    } else {
      ElNotification({
        title: '提示',
        message: '深色模式已关闭！',
        type: 'success',
      })
    }
  }
);
onMounted(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  isDark.value = mediaQuery.matches;
  mediaQuery.addEventListener('change', (event) => {
    isDark.value = event.matches;
  });
});
//检测后端是否运行
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://127.0.0.1:5000/GetServerTime', true);
xhr.onreadystatechange = function () {
  if (xhr.status === 200) {
  } else {
    ElMessage.error('后端服务器连接失败，请检查网络连接！')
    ElLoading.service({ fullscreen: true })
  }
};
xhr.send();
</script>






<template>  
  <el-watermark :content="watermarkContent" style="pointer-events:none;position:absolute;top:0;bottom:0;left:0;right: 0;">  
    <div style="position : absolute;height: 100%; width: 100%;z-index:999999999999999999;" />  
  </el-watermark>  
  <router-view />
</template>  
  


  
