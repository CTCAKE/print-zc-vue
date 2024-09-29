<script setup lang="ts">
import Cookies from 'js-cookie';
if (Cookies.get('login') != 'true') {
  window.location.href = '/Admin/Login';
}
</script>