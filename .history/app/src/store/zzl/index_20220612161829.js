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
};

const mutations = {
    //
    UPDATEINPUT(state, value) {
        state.input = value;
    },
    UPDATETIME(state, value) {
        let foo = dayjs(value[0]).format("YYYY-MM-DD HH:mm:ss");
        let bar = dayjs(value[1]).format("YYYY-MM-DD HH:mm:ss");
        state.begintime = foo;
        state.endtime = bar;
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
        let foo = {
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
