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
            <div>
                <p>内容</p>
                <VueEditor ref="vueEditor">

                </VueEditor>
                <div>
                
                <el-button type="primary" @click="AddDisplay">保存</el-button>
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
        components:{
		    VueEditor,
	    }
    }
</script>

<style scoped>
	#student{
		width: 85.4%;
		position: absolute;
		top: 60px;
		background-color: white;
		border: none;
		/* border: 1px solid red; */
	}
	#student>div:nth-of-type(1){
		height: 16%;
		margin-bottom: 7%;
		margin-top: 2%;
		border: none;
		/* background-color: rgb(243,248,255); */
	}
	#student>div:nth-of-type(2){
		background-color: white;
		border: 1px solid white;
		border-radius: 13px;
		box-shadow:0px 0px 10px #c3c3c3;
	}
	#student_div1>div:nth-of-type(1){
		width: 16%;
		height: 10%;
		float: left;
	}
	#student_div1>div:nth-of-type(1)>p{
		font-size: 2vw;
		float: left;
	}
	#student_div1>div:nth-of-type(1)>div{
		height: 8px;
		width: 23px;
		background-color: rgb(64,158,255);
		border: none;
		border-radius: 50px 50px 50px 50px;
		float: left;
		margin:1vw;
		margin-left: 0;
	}
	#student_div2>div:nth-of-type(1){
        height: 10vh;
        color: rgb(64,158,255);
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
        width: 6vw;
        margin-top: 6vh;
    }
</style>