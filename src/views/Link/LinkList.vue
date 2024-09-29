<!--表格 -->
<template>
  <div class="table">
    <!--工具栏-->
    <div style="display: flex;margin-bottom: 15px;">
    <el-button type="primary" @click="copySelectedLinks">复制选中</el-button>
    <el-button type="danger" @click="deleteSelectedLinks">销毁选中</el-button>
</div>
    <el-table :data="data" border style="width: 100%;display: flex;" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="auto"></el-table-column>
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="link" label="链接"></el-table-column>
      <el-table-column prop="package" label="套餐内容" width="auto"></el-table-column>
      <el-table-column prop="number" label="可用次数"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ElMessage, ElNotification } from 'element-plus';
import Cookies from 'js-cookie';
const xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:5000/getlinklist?username=" + Cookies.get("username") + "&password=" + Cookies.get("password"), false);
xhr.send();
const tabledata = JSON.parse(xhr.responseText);
if (tabledata.code != 0) {
  ElMessage.error(tabledata.message);
}
const data = tabledata.data;
export default {
  data() {
    return {
      data,
    };
  },
  methods: {
    handleSelectionChange(selection) {
      this.selectedLinks = selection.map(item => item.link);
    },
        copySelectedLinks() {
    if (!this.selectedLinks || this.selectedLinks.length === 0) {
        this.$message.error('请先选择要复制的链接');
        return;
    }
    const textToCopy = this.selectedLinks.join('\n');
    navigator.clipboard.writeText(textToCopy).then(() => {
        this.$message.success('链接已复制到剪贴板');
    }).catch(() => {
        this.$message.error('复制失败');
    });
    },
    deleteSelectedLinks() {
    if (!this.selectedLinks || this.selectedLinks.length === 0) {
        this.$message.error('请先选择要销毁的链接');
        return;
    }
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:5000/deletelink?username=" + Cookies.get("username") + "&password=" + Cookies.get("password") + "&link=" + this.selectedLinks.join(','), false);
    xhr.send();
    console.log(this.selectedLinks.join(','))
    const response = JSON.parse(xhr.responseText);
    if (response.code === 0) {
        this.$message.success('链接已销毁');
        this.selectedLinks = [];
        setTimeout(() => {
            location.reload();
        }, 1000)
    } else {
        this.$message.error('销毁失败，服务端返回:' + response.message);
    }
    }
    }
}
</script>


<style scoped>
.table {
  margin-top: 20px;
}
</style>