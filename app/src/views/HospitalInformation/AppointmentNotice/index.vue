<template>
	<div id="student">
		<div id="student_div1">
			<div>
                <div></div>
				<p>预约须知</p>
			</div>
		</div>
		<div id="student_div2">
            <div>
                <p>编辑预约信息</p>
            </div>
            <div  id="student_div2fu">
                <p>内容</p>
                <VueEditor ref="vueEditor" :config="config">

                </VueEditor>
                <div>
                
                <el-button type="primary">保存</el-button>
                </div>
            </div>
		</div>
	</div>
</template>

<script>
    // 导入富文本编辑组件
	import VueEditor from "vue-word-editor";
	import "quill/dist/quill.snow.css";

    export default{
		name:'Notice',
		data(){
			return {
				config: {
					// 上传图片的配置
					uploadImage: {
						url: "http://localhost:3000/upload",
						name: "file",
						// res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
						uploadSuccess(res, insert){
						insert("http://localhost:3000" + res.data.url)
						}
					},
					
					// 上传视频的配置
					uploadVideo: {
						url: "http://localhost:3000/upload",
						name: "file",
						uploadSuccess(res, insert){
						insert("http://localhost:3000" + res.data.url)
						}
					},
				},
			}
		},
        components:{
		    VueEditor,
	    }
    }
</script>

<style scoped>
	#student{
		border: 1px solid rgb(243,248,254);
	}
	#student>div:nth-of-type(1){
		height: 16%;
		margin: 0;
		margin-bottom: calc(80vw * 100 / 1920);
		
		border: none;
		/* background-color: rgb(243,248,255); */
	}
	#student>div:nth-of-type(2){
		height: calc(720vw * 100 / 1920);
		background-color: white;
		border: 0px solid white;
		border-radius: 13px;
		box-shadow:0px 0px 10px #c3c3c3;
		position: relative;
	}
	#student_div1>div:nth-of-type(1){
		height: 10%;
		float: left;
	}
	#student_div1>div:nth-of-type(1)>p{
		font-size: calc(36vw * 100 / 1920);
		float: left;
	}
	#student_div1>div:nth-of-type(1)>div{
		height: calc(12vw * 100 / 1920);
		width: calc(36vw * 100 / 1920);
		background-color: rgb(64,158,255);
		border: none;
		border-radius: 50px;
		float: left;
		margin:1vw;
		margin-left: 0;
	}
	#student_div1>div:nth-of-type(2)>button{
		margin-top: 0;
		padding: calc(10vw * 100 / 1920) calc(15vw * 100 / 1920) ;
		font-size: calc(19vw * 100 / 1920);
	}
	#student_div2>div:nth-of-type(1){
        height: 10vh;
        color: rgb(64,158,255);
		border: none;
		border-radius: 10px 10px 0 0;
        background-color: rgb(242,242,242);
        line-height: 10vh;
	}
    #student_div2>div:nth-of-type(1)>p{
        font-size: 1.2vw;
        margin-left: 1.5vw;
    }
    #student_div2>div:nth-of-type(2){
        margin-left: 3vw;
    }
    #student_div2>div:nth-of-type(2)>P{
        font-size: 1.2vw;
        height: 13vh;
        line-height: 13vh;
        color: rgb(204,204,204);
    }
    #student_div2>div:nth-of-type(2)>div:nth-of-type(2){
        height: 16vh;
    }
    #student_div2>div:nth-of-type(2)>div:nth-of-type(2)>button{
		margin: 0;
        margin-top: calc(120vw * 100 / 1920);
		padding: calc(15vw * 100 / 1920) calc(50vw * 100 / 1920) ;
		font-size: calc(22vw * 100 / 1920);
		margin-bottom: calc(80vw * 100 / 1920);
    }
	#student_div2fu>div:nth-of-type(1)>div:nth-of-type(2){
		height: 100vh;
	}
	#student_div2fu>div:nth-of-type(1){
		height: calc(310vw * 100 / 1920);
		width: calc(1200vw * 100 / 1920);
	}
</style>