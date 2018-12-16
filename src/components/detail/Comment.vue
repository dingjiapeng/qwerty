<template>
    <el-card shadow="never" style="margin-top: 10px">
        <div slot="header" style="color: #FA7F64;font-size: 16px;">

            <i class="icon iconfont icon-pinglun" style="color: #E6A23C;font-size: 18px;"></i>

            <span>评论</span>
        </div>
        <el-row style="text-align: center">
            <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入评论内容，恶意灌水会被永久封号"
                    v-model="comment">
            </el-input>
            <el-row type="flex" justify="end">
             <el-col :span="4" style="text-align: right;margin-top: 10px">
                 <el-button type="primary" @click="toComment" :loading="loading">提交评论</el-button>
             </el-col>
            </el-row>

        </el-row>

        <!--留言列表开始-->
        <div class="bs-example" data-example-id="default-media" v-for="(v,k) in commentData.data">
            <div class="media">
                <div class="media-left">
                    <a href="#">
                        <img class="media-object" :src="v.user_pic" data-holder-rendered="true" style="width: 45px; height: 45px;border-radius:50%">
                    </a>
                </div>
                <div class="media-body" style="color: #606266">
                    <h5 class="media-heading">{{v.user_name}}</h5>
                    <span>
                            {{v.comment_content}}
                    </span>
                </div>
            </div>
        </div>
        <!--留言列表结束-->
        <div style="text-align: center;margin-top: 20px">
            <div v-if="commentData.data.length>=1">
                <el-pagination

                        background
                        layout="prev, pager, next"
                        :page-count="Number(commentData.last_page)"
                        @current-change="changePage"
                >
                </el-pagination>
            </div>

        </div>
    </el-card>
</template>
<script>
    import store from '@/store/video'
    export default {
        data(){
            return{
                comment:'',
            }
        },
        methods:{
            toComment(){

                if(this.comment.length <4){
                    this.$message.warning("评论内容需要大于4个字符")
                    return false
                }
                store.dispatch("toComment",{comment:this.comment})
                // store.dispatch("getCommentData",{vod_id:this.$route.params.vid})
            },
            changePage(page){
                // console.log(page)
                store.dispatch("getCommentData",{vod_id:this.$route.params.vid,page:page})
            }
        },
        computed:{
            getYouLike:function(){
                return store.state.commentData

            },
            loading:function(){
                if(!store.state.loading){
                    this.comment=''
                }
                return store.state.loading
            },
            commentData:function(){
                return store.state.commentData
            }

        },
        created(){
            store.dispatch("getCommentData",{vod_id:this.$route.params.vid,page:1})
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .bs-example{
        margin: 15px 5px;
    }

</style>