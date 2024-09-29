<template>
    <h1>创建链接</h1>
    <el-form @submit.prevent="addLink">
      <el-form-item label="选择套餐：">
        <el-select v-model="selectedPackage">
          <el-option
            v-for="pkg in packages"
            :key="pkg.id"
            :label="pkg.content"
            :value="pkg.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">创建</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script>
  import { ElMessage } from 'element-plus';
  import Cookies from 'js-cookie';
  
  export default {
    data() {
      return {
        packages: [], // 用于存储后端返回的套餐数据
        selectedPackage: null, // 用于存储用户选择的套餐ID
      };
    },
    methods: {
      getLink() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:5000/getpkgs?username=' + Cookies.get('username'));
        xhr.onload = () => {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.code != 0) {
              ElMessage.error('获取套餐失败，服务器返回：' + response.message);
              if (response.code == -1) {
                ElMessage.info('当前账号无可用套餐，请先前往创建。')
              }
            } else {
              // 将返回的套餐数据赋值给packages
              this.packages = response.data[0]; // 假设套餐数据在第一个数组中
            }
          } else {
            ElMessage.error('获取套餐失败，服务器返回：' + xhr.status);
          }
        };
        xhr.send();
      },
      addLink() {
        // 这里可以添加创建链接的逻辑
      },
    },
    mounted() {
      this.getLink();
    },
  };
  </script>
  