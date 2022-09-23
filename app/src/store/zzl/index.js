//格式化时间
import dayjs from "dayjs";
//clonedeep
import _ from "lodash";

const state = {
    input: "",
    begintime: "",
    endtime: "",
    tableData: [],
    tableDetail: {},
    isSub: true,
};

const mutations = {
    //表单验证的阈值
    SUBCHECK(state, value) {
        state.isSub = value;
    },
    //
    UPDATEINPUT(state, value) {
        state.input = value;
    },
    UPDATETIME(state, value) {
        if (value instanceof Array && value.length == 2) {
            let foo = dayjs(value[0]).format("YYYY-MM-DD HH:mm:ss");
            let bar = dayjs(value[1]).format("YYYY-MM-DD HH:mm:ss");
            state.begintime = foo;
            state.endtime = bar;
        } else {
            state.begintime = "";
            state.endtime = "";
        }
    },
    UPDATETABLEDATA(state, value) {
        state.tableData = value;
        // state.tableData = _.cloneDeep(value);
        //修改状态码
    },
    UPDATEDETAIL(state, value) {
        //处理操作页的数据，elem-table需要一个数组类型的数据
        // let foo = [...value.ordermsg, ...value.patientmsg];
        // let foo = {
        //     ordermsg: { ...value.ordermsg[0] },
        //     patientmsg: { ...value.patientmsg[0] },
        // };
        //住院接口的数据结构 带有data字段 正确的
        let foo;
        foo = {
            ordermsg: { ...value.data.ordermsg[0] },
            patientmsg: { ...value.data.patientmsg[0] },
        };
        state.tableDetail = foo;
    },
};

export default {
    state,
    mutations,
    // actions,
};
