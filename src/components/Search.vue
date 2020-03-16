<template>
  <div class="search_input">
    <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="searching"></el-input>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: [],
  data () {
    return {
      searching: ''
    }
  }
}
</script>