<template>
  <el-dialog
    v-model="dialogVisible"
    title="修改用户名"
    width="500"
    :before-close="handleClose"
  >
  
  <p>暂未完善</p>
    <template #footer>
      <div class="dialog">
        <el-button @click="ElMessageBox.confirm('确定要退出吗？你所做的更改将不会保存。') .then(() => { dialogVisible = false })">取消</el-button>
        <el-button type="primary" @click="saveUsername">
          保存
        </el-button>
      </div>
    </template>

  </el-dialog>
  <el-table :data="tableData" border style="width: 100%;display: flex;">
    <el-table-column prop="id" label="ID" id="id"/>
    <el-table-column fixed="right" label="操作">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click="dialogVisible = true"
        >
          修改
        </el-button>
      </template>
    </el-table-column>
    <el-table-column prop="username" label="用户名" id="username"/>
    <el-table-column prop="balance" label="余额" />
  </el-table>
  
  <div class="edit" id="editform" style="display: none;">
  <el-button type="primary">提交</el-button>
  </div>
</template>


<script lang="ts" setup>
import Cookies from 'js-cookie';
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
const text = ref('')
const textarea = ref('')
const id = Cookies.get('id')
const username = Cookies.get('username')
const balance = Cookies.get('balance')
const tableData = [
  {
    id: id,
    username: username,
    balance: balance,
  }
]
const dialogVisible = ref(false)
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确定要退出吗？你所做的更改将不会保存。')
    .then(() => {
      done()
    })
    .catch(() => {
    })
}
const saveUsername = () => {
  dialogVisible.value = false
  const username = document.getElementById('username') as HTMLInputElement
  if (username.value !== '') {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'http://127.0.0.1:5000/edit_user?username=' + username.value + '&id=' + id, true)
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText)
    }
    xhr.send()
    username.value = ''

  }
}
</script>