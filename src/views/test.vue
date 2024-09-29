<template>
    <div>
      <p>Cookie: {{ cookieValue }}</p>
      <button @click="setCookie">Set Cookie</button>
      <button @click="getCookie">Get Cookie</button>
      <button @click="removeCookie">Remove Cookie</button>
    </div>
  </template>
  
  <script>
  import Cookies from 'js-cookie';
  
  export default {
    data() {
      return {
        cookieValue: ''
      };
    },
    methods: {
      setCookie() {
        Cookies.set('login', 'true');
      },
      getCookie() {
        this.cookieValue = Cookies.get('login');
      },
      removeCookie() {
        Cookies.remove('login');
      }
    }
  };
  </script>
  