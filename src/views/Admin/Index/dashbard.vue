<template>
    <el-dialog
      v-model="dialogVisible"
      title="公告"
      width="70%"
      :before-close="handleClose"
    >
      <span>{{ notice }}</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="donotshow">
            不再显示
          </el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!--主体内容开始-->
    <div class="common-layout">
    <el-container>
    <el-header class="header-content">
    <div class="header-right">
      <span style="margin-right: 10px"><el-icon><User /></el-icon>{{ username }}</span>
      <el-button type="primary" @click="refush"><el-icon><RefreshRight /></el-icon></el-button>
      <el-button type="primary" @click="dialogVisible = true">公告</el-button>
      <el-button type="primary" @click="logout">退出</el-button>
      </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
        <!--菜单开始-->
        
                <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo menu"
                    :collapse="isCollapse"
                    @open="handleOpen"
                    @close="handleClose"
                    style="z-index: 999;height: 90%;"
                >
                <el-menu-item @click="toggleCollapse" class="toggle-item">
                    <el-icon><Fold /></el-icon>
                    <template #title>菜单</template>
                </el-menu-item>
                <el-menu-item index="info" @click="handleMenuClick">
                    <el-icon><User /></el-icon>
                    <template #title>我的信息</template>
                </el-menu-item>
                    <el-sub-menu index="links" >
                    <template #title>
                      <el-icon><Link /></el-icon>
                        <span>链接管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item @click="handleMenuClick" index="links-list">链接列表</el-menu-item>
                        <el-menu-item @click="handleMenuClick" index="links-add">添加链接</el-menu-item>
                    </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="pkgs" >
                    <template #title>
                      <el-icon><FirstAidKit /></el-icon>
                        <span>套餐管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item @click="handleMenuClick" index="pkgs-list">套餐列表</el-menu-item>
                        <el-menu-item @click="handleMenuClick" index="pkgs-add">添加套餐</el-menu-item>
                    </el-menu-item-group>
                    </el-sub-menu>
                    </el-menu>
        </el-aside>
        <el-main class="main-content">
          
    <RouterView />
  </el-main>
      </el-container>
    </el-container>
  </div>
 
</template>



<style>
.header-content {
    text-align: center;
    background-color: #409EFF;
    line-height: 60px;
    color: rgb(255, 255, 255);
    font-size: 17px;
    font-family:'Segoe UI';
    font-weight: bold;
    display: auto;
}
.main-content {
    position: absolute;
    left: 15%;
    top: 10%;
    width: 80%;
    height: 80%;
    text-align: center;
    background-color: #ffffff;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.menu {
    position: absolute;
    left:0%;
}
#app {
  display: grid;
  grid-template-columns: 1fr 1fr;
  clear: both;
  display: block;
  margin:auto;
  border-radius: 35%;
  text-align: center;
}

.login-card {
  padding: 20px;
  border-radius: 25%;
  text-align: center;
  margin: auto;
}

.card{
  padding: 20px;
  border-radius: 40%;
  text-align: center;
  margin: auto;
}

.toggle-item{
    text-align: center;
    height: 60px;
    background-color: #ffffff;
}

.header-right {
    float: right;
    margin-right: 20px;
    line-height: 60px;
    color: rgb(255, 255, 255);
    font-size: 17px;
    font-family:'Segoe UI';
    font-weight: bold;
    height: 50%;
}
</style>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
<script lang="ts" setup>
    const icon = ref('Fold');
    import * as ElementPlusIconsVue from '@element-plus/icons-vue'
    import { ref } from 'vue'
    import { ElLoading, ElMessage, ElMessageBox, ElNotification } from 'element-plus'
    import config from '@/config.js';
    import { RouterView } from 'vue-router'
    import { useRouter } from 'vue-router'
    const router = useRouter();
    let WebName = config.Website.name;
    const dialogVisible = ref(true)
    const notice = config.Website.notice;
    if (Cookies.get('notice') == undefined) {
      console.log('Cookie未设置')
      Cookies.set('notice', notice)
      console.log('cookie已更新')
      dialogVisible.value = true
    } else {
      if (Cookies.get('notice') == notice) {
        console.log('Cookie已设置,公告内容一致')
        console.log('cookie无需更新')
        if (Cookies.get('show') == 'false') {
          dialogVisible.value = false
        } else {
          dialogVisible.value = true
        }
      } else {
        console.log('Cookie已设置,公告内容不一致')
        Cookies.set('notice', notice)
        console.log('cookie已更新')
      }
    }
    const username = Cookies.get('username');
import Cookies from 'js-cookie';
    const logout = () => {
        Cookies.remove('username');
        Cookies.remove('login');
        ElMessage.success('退出成功！');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000)
        
    }
    const isCollapse = ref(true)
    const handleOpen = (key: string) => {
      //console.log(key)
    }
    const handleClose = (key: string) => {
      //console.log(key)
    }
    const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value;
    icon.value = isCollapse.value ? 'Expand' : 'Fold';
    };
  
    const handleMenuClick = (index: string) => {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
        index = index.index
        console.log(index)
        setTimeout(() => {
        if(index == "info"){
          router.push('/Admin/Info')
          document.title = '信息管理 - PRINT'
        } else if(index == "links-list"){
          document.title = '链接列表 - PRINT'
          router.push('/Admin/Link/List')
        } else if(index == "links-add"){
          document.title = '添加链接 - PRINT'
          router.push('/Admin/Link/Add')
        } else if(index == "pkgs-list"){
          router.push('/Admin/Pkgs/List')
          document.title = '套餐列表 - PRINT'
        } else if(index == "pkgs-add"){
          router.push('/Admin/Pkgs/Add')
          document.title = '添加套餐 - PRINT'
        } else {
            document.title = '后台管理 - PRINT'
            ElMessageBox.alert('功能暂未开放', '提示', {
            confirmButtonText: '确定',
            })
        }
        
        loading.close()
        }, 150)
        
        
      }
      const currentRoute = useRouter().currentRoute.value;
      const currentPath = currentRoute.path;
      console.log(currentPath)
      if (currentPath == "/Admin" || currentPath == "/Admin/") {
        router.push('/Admin/Info')
      }
      //获取用户信息
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://127.0.0.1:5000/get_user?username=' + Cookies.get('username') , true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          console.log(response);
          if (response.code != 0){
            ElMessageBox.alert('获取用户信息失败，请重新登录', '提示', {
            confirmButtonText: '确定',
            //跳转
            callback: action => {
              Cookies.remove('username')
              Cookies.remove('login')
              window.location.href = '/login'
            }
            })
          } else if (response.code == 0) {
            Cookies.set('username', response.username)
            Cookies.set('balance', response.balance)
            Cookies.set('id', response.id)
          }
        }
      };
      xhr.send();
      const refush = () => {
        window.location.reload()
      }

      const donotshow = () => {
        dialogVisible.value = false
        Cookies.set('show', 'false')
      }













console.log(`
▄▄▄▄▄▄▄▄▄▄   ▄         ▄                                                     
▐░░░░░░░░░░▌ ▐░▌       ▐░▌                                                    
▐░█▀▀▀▀▀▀▀█░▌▐░▌       ▐░▌                                                    
▐░▌       ▐░▌▐░▌       ▐░▌                                                    
▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌                                                    
▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌                                                    
▐░█▀▀▀▀▀▀▀█░▌ ▀▀▀▀█░█▀▀▀▀                                                     
▐░▌       ▐░▌     ▐░▌                                                         
▐░█▄▄▄▄▄▄▄█░▌     ▐░▌                                                         
▐░░░░░░░░░░▌      ▐░▌                                                         
▀▀▀▀▀▀▀▀▀▀        ▀                                                          
                                                                             
▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄        ▄  ▄▄▄▄▄▄▄▄▄▄▄              
▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░▌      ▐░▌▐░░░░░░░░░░░▌             
▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌ ▀▀▀▀█░█▀▀▀▀ ▐░▌░▌     ▐░▌ ▀▀▀▀█░█▀▀▀▀              
▐░▌       ▐░▌▐░▌       ▐░▌     ▐░▌     ▐░▌▐░▌    ▐░▌     ▐░▌                  
▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌     ▐░▌     ▐░▌ ▐░▌   ▐░▌     ▐░▌                  
▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌     ▐░▌     ▐░▌  ▐░▌  ▐░▌     ▐░▌                  
▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀█░█▀▀      ▐░▌     ▐░▌   ▐░▌ ▐░▌     ▐░▌                  
▐░▌          ▐░▌     ▐░▌       ▐░▌     ▐░▌    ▐░▌▐░▌     ▐░▌                  
▐░▌          ▐░▌      ▐░▌  ▄▄▄▄█░█▄▄▄▄ ▐░▌     ▐░▐░▌     ▐░▌                  
▐░▌          ▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░▌      ▐░░▌     ▐░▌                  
▀            ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀        ▀▀       ▀                   
                                                                             
▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄                                        
▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌                                       
▀▀▀▀█░█▀▀▀▀  ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀                                        
    ▐░▌          ▐░▌     ▐░▌                                                 
    ▐░▌          ▐░▌     ▐░█▄▄▄▄▄▄▄▄▄                                        
    ▐░▌          ▐░▌     ▐░░░░░░░░░░░▌                                       
    ▐░▌          ▐░▌      ▀▀▀▀▀▀▀▀▀█░▌                                       
    ▐░▌          ▐░▌               ▐░▌                                       
▄▄▄▄█░█▄▄▄▄      ▐░▌      ▄▄▄▄▄▄▄▄▄█░▌                                       
▐░░░░░░░░░░░▌     ▐░▌     ▐░░░░░░░░░░░▌                                       
▀▀▀▀▀▀▀▀▀▀▀       ▀       ▀▀▀▀▀▀▀▀▀▀▀                                        
                                                                             
▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄  ▄  ▄                  
▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌▐░▌▐░▌                 
▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀ ▐░▌▐░▌▐░▌                 
▐░▌          ▐░▌       ▐░▌▐░▌          ▐░▌          ▐░▌▐░▌▐░▌                 
▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄ ▐░▌▐░▌▐░▌                 
▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌▐░▌▐░▌                 
▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀█░█▀▀ ▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀ ▐░▌▐░▌▐░▌                 
▐░▌          ▐░▌     ▐░▌  ▐░▌          ▐░▌           ▀  ▀  ▀                  
▐░▌          ▐░▌      ▐░▌ ▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄  ▄  ▄  ▄                  
▐░▌          ▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌▐░▌▐░▌                 
▀            ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀  ▀  ▀                  
                                                                             
▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄        ▄  ▄▄▄▄▄▄▄▄▄▄▄              
▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░▌      ▐░▌▐░░░░░░░░░░░▌             
▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌ ▀▀▀▀█░█▀▀▀▀ ▐░▌░▌     ▐░▌ ▀▀▀▀█░█▀▀▀▀              
▐░▌       ▐░▌▐░▌       ▐░▌     ▐░▌     ▐░▌▐░▌    ▐░▌     ▐░▌                  
▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌     ▐░▌     ▐░▌ ▐░▌   ▐░▌     ▐░▌                  
▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌     ▐░▌     ▐░▌  ▐░▌  ▐░▌     ▐░▌                  
▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀█░█▀▀      ▐░▌     ▐░▌   ▐░▌ ▐░▌     ▐░▌                  
▐░▌          ▐░▌     ▐░▌       ▐░▌     ▐░▌    ▐░▌▐░▌     ▐░▌                  
▐░▌          ▐░▌      ▐░▌  ▄▄▄▄█░█▄▄▄▄ ▐░▌     ▐░▐░▌     ▐░▌                  
▐░▌          ▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░▌      ▐░░▌     ▐░▌                  
▀            ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀        ▀▀       ▀                   
                                                                             
▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄       ▄▄▄▄▄▄▄▄▄▄▄  ▄         ▄  ▄▄        ▄         
▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌     ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░▌      ▐░▌        
▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌     ▐░█▀▀▀▀▀▀▀█░▌▐░▌       ▐░▌▐░▌░▌     ▐░▌        
▐░▌       ▐░▌▐░▌       ▐░▌     ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌▐░▌    ▐░▌        
▐░▌       ▐░▌▐░▌       ▐░▌     ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌ ▐░▌   ▐░▌        
▐░▌       ▐░▌▐░▌       ▐░▌     ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌  ▐░▌  ▐░▌        
▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌     ▐░█▄▄▄▄▄▄▄█░▌▐░▌       ▐░▌▐░▌   ▐░▌ ▐░▌        
▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌     ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░▌    ▐░▌▐░▌        
▀▀▀▀▀▀█░█▀▀  ▀▀▀▀▀▀█░█▀▀       ▀▀▀▀▀▀█░█▀▀ ▐░█▄▄▄▄▄▄▄█░▌▐░▌     ▐░▐░▌        
       ▐░▌          ▐░▌               ▐░▌  ▐░░░░░░░░░░░▌▐░▌      ▐░░▌        
        ▀            ▀                 ▀    ▀▀▀▀▀▀▀▀▀▀▀  ▀        ▀▀         
                                                                             
▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄         ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄ 
▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
▐░█▀▀▀▀▀▀▀█░▌ ▀▀▀▀▀▀▀▀▀█░▌ ▀▀▀▀▀▀▀▀▀█░▌▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌
▐░▌       ▐░▌          ▐░▌          ▐░▌▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░▌       ▐░▌
▐░█▄▄▄▄▄▄▄█░▌          ▐░▌          ▐░▌▐░█▄▄▄▄▄▄▄█░▌▐░░░░░░░░░░░▌▐░█▄▄▄▄▄▄▄█░▌
▐░░░░░░░░░░░▌ ▄▄▄▄▄▄▄▄▄█░▌ ▄▄▄▄▄▄▄▄▄█░▌▐░░░░░░░░░░░▌ ▀▀▀▀▀▀▀▀▀█░▌▐░░░░░░░░░░░▌
▀▀▀▀▀▀▀▀▀█░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌ ▀▀▀▀▀▀▀▀▀█░▌          ▐░▌ ▀▀▀▀▀▀▀▀▀█░▌
         ▐░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀           ▐░▌          ▐░▌          ▐░▌
▄▄▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄           ▐░▌ ▄▄▄▄▄▄▄▄▄█░▌ ▄▄▄▄▄▄▄▄▄█░▌
▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌          ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀            ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀ 
                                                                             
▄▄▄▄▄▄▄▄▄▄▄   ▄▄▄▄▄▄▄▄▄    ▄▄▄▄▄▄▄▄▄                                         
▐░░░░░░░░░░░▌ ▐░░░░░░░░░▌  ▐░░░░░░░░░▌                                        
▀▀▀▀▀▀▀▀▀█░▌▐░█░█▀▀▀▀▀█░▌▐░█░█▀▀▀▀▀█░▌                                       
         ▐░▌▐░▌▐░▌    ▐░▌▐░▌▐░▌    ▐░▌                                       
▄▄▄▄▄▄▄▄▄█░▌▐░▌ ▐░▌   ▐░▌▐░▌ ▐░▌   ▐░▌                                       
▐░░░░░░░░░░░▌▐░▌  ▐░▌  ▐░▌▐░▌  ▐░▌  ▐░▌                                       
▀▀▀▀▀▀▀▀▀█░▌▐░▌   ▐░▌ ▐░▌▐░▌   ▐░▌ ▐░▌                                       
         ▐░▌▐░▌    ▐░▌▐░▌▐░▌    ▐░▌▐░▌                                       
▄▄▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄█░█░▌▐░█▄▄▄▄▄█░█░▌                                       
▐░░░░░░░░░░░▌ ▐░░░░░░░░░▌  ▐░░░░░░░░░▌                                        
▀▀▀▀▀▀▀▀▀▀▀   ▀▀▀▀▀▀▀▀▀    ▀▀▀▀▀▀▀▀▀                                         
`) //小彩蛋
</script>