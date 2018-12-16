<template>
    <div v-if="somap.length>=1">
    <el-carousel style="margin-top: 60px">
        <el-carousel-item v-for="(v,k) in somap" :key="v.sid">
            <router-link :to="'/detail/'+v.video_id">
            <img :src="v.somap_url" class="img-responsive">
            </router-link>
        </el-carousel-item>

    </el-carousel>
    </div>
</template>
<script>
    import store from '@/store/video'
   export default {
       data(){
           return{

           }
       },
       computed:{
           somap(){
               return store.state.somap
           }
       },
       created(){
           store.dispatch("getSomapData")
       }
   }
</script>