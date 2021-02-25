<template>
  <div />
</template>

<script>
export default {
  layout: 'welcome',
  middleware ({ $auth, redirect }) {
    if ($auth.loggedIn) {
      redirect('/home')
    }
  }
}
</script>
