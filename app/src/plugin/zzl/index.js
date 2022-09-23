const install = (Vue, options = {}) => {
    //1.初始记录渲染
    Vue.prototype.getTableData = async function (url) {
        //传输函数调用的名字 fn
        let foo = await this.$API.initRender(url)
        // let foo = await this.$API.queryOutpatient();
        if (foo.code == 200) {
            this.$store.commit('UPDATETABLEDATA', foo.data)
            //分页
            this.navInfo = this.$store.state.zzl.tableData
            //重写状态
            //触发渲染页面的
            this.$bus.$emit('tragger0')
        }

        async function foo(params) {
            let bar = await axios
        }
    }
    //2.操作记录渲染
    Vue.prototype.getTableData2 = async function (url, data) {
        //传输函数调用的名字 fn
        let foo = await this.$API.operatRender(url, data)
        if (foo.code == 200) {
            //这里对foo数据处理放在vuex中
            this.$store.commit('UPDATEDETAIL', foo)
            // this.tableDetail = this.$store.state.zzl.tableDetail;
            //触发操作页面组件的tableDetail更新
            //如果直接在这里给 tableDetail 赋值的话，this指向会出问题，所以要在组件中触发
            this.$bus.$emit('tragger2', foo)
        }
    }
    //3.搜索渲染
    Vue.prototype.getSelectData = async function (url, data) {
        let foo = await this.$API.subSelect(url, data)
        if (foo.code == 200) {
            this.$store.commit('UPDATETABLEDATA', foo.data)

            //触发初始化页面组件的tabledata更新
            //如果直接在这里给 tabledat 赋值的话，this指向会出问题，所以要在组件中触发
            this.$bus.$emit('tragger')
        }
    }
    //4.更新备注
    Vue.prototype.updateRemark = async function (url, data) {
        let foo = await this.$API.updateRemark(url, {
            ...data,
            balance: 0,
            from: '',
            money: 0,
            pmode: '',
            status: 0,
            time: '',
            type: '',
        })
        //更新成功
        if ((foo.code = 200)) {
            this.$message('修改备注成功')
            //
        } else {
            this.$message.error(data.info)
        }
    }
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    version: '1.0.0',
    install,
    // Feature,
}
