<template>
  <head>
  <link rel="stylesheet" href="./assets/main.css" />
</head>
  <div class="login-card" style="display: grid;grid-template-columns: 1fr 1fr;clear: both;display: block;margin:auto;border-radius: 15%;">
    <el-card class="card" style="width: 480px">
      <el-form
    ref="loginFormRef"
    style="max-width: 600px"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
  >
  <el-form-item>
    <h1>登录 - {{ WebName }}</h1>
  </el-form-item>
  <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username" type="text" autocomplete="on" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" type="password" autocomplete="on" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(loginFormRef)">
        登录
      </el-button>
    </el-form-item>
  </el-form>
</el-card>
  </div>
</template>
<script setup lang="ts">  
import Cookies from 'js-cookie';
import { ElNotification } from 'element-plus'
import config from '@/config.js';
const WebName = config.Website.name;
import { reactive, ref } from 'vue'
import { ElLoading, type FormInstance, type FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { dataType } from 'element-plus/lib/components/table-v2/src/common.js';
const loginFormRef = ref<FormInstance>()
if (Cookies.get('login') == 'true'){
  window.location.href = '/Admin/';
} else {
  console.log('未登录');
}
const checkUser = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入用户名'))
  } else {
    setTimeout(() => {
      callback()
    }, 300)
  }
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  password: '',
  username: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  password: [{ validator: validatePass, trigger: 'blur' }],
  username: [{ validator: checkUser, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      const load = ElLoading.service({
        lock: true,
        text: '登录中...',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      //xhr
      const xhr = new XMLHttpRequest()
      const username = ruleForm.username
      const password = ruleForm.password
      xhr.open('GET', 'http://127.0.0.1:5000/login?username=' + username + '&password=' + password, true)
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const response = xhr.responseText
          if (response === '登录成功') {
            Cookies.set('login', 'true');
            Cookies.set('username', username);
            Cookies.set('password', password);
            ElNotification({
              title: '登录成功',
              message: '欢迎回来，' + username,
              type: 'success',
            });
            load.close();
            setTimeout(() => {
              window.location.href = '/Admin/Index/'
            }, 1000)
          } else {
            ElMessage({
                message: '登录失败：' + response,
                type: 'error',
              },
            );
            load.close()
          }
        }
      }
      xhr.send(JSON.stringify(ruleForm))
      load.close()
    } else {
      ElMessage({
        message: '出现错误！',
        type: 'error',
      })
    }
  })
}
</script>

<style scoped>
.login-card{
  display: grid;
  grid-template-columns: 1fr 1fr;
  clear: both;
  display: block;
  margin:auto;
  border-radius: 15%;
}
</style>
