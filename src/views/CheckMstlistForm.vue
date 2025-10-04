<template>
  <div>
    <h4 style="margin-bottom:40px;">
      {{selectedName}} 점검표 분전함 조회
    </h4>

    <table class="table">
      <thead>
        <tr class="table-dark text-dark">
          <th>인덱스</th>
          <th>분전함</th>
          <th>점검일자</th>
          <th>온도/습도</th>
          <th>등록일</th>
          <th>수정일</th>
        </tr>
      </thead>
      <tbody>
        <!-- 데이터를 반복하여 동적으로 행 생성 -->
        <tr v-for="(row, index) in tableData" :key="index">
          <td>{{ row.idx }}</td>
          <td><router-link :to="`/CheckInsertForm/${ row.idx }`">{{ row.distribution_name }}</router-link></td>
          <td>{{ row.check_dt }}</td>
          <td>{{ row.temperature }}</td>
          <td>{{ row.create_dt }}</td>
          <td>{{ row.modify_dt }}</td>
        </tr>
      </tbody>
    </table>

    
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router'
import axios from "axios";
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  methods: {

  },
  setup() {

    const route = useRoute();

    const tableData = ref([]); // 테이블 데이터를 저장할 ref

    const getDistributionList = process.env.VUE_APP_API_BASE_URL + "/api/check/checkMst/";
    const selectedIdx = ref(route.params.idx);


    const fetchData = () => {
      axios.post(getDistributionList + selectedIdx.value)
      .then(response=>{ 
        tableData.value = response.data; // 서버에서 받아온 데이터를 테이블에 반영

      })
      .catch(response=>{
        console.error("데이터 요청 실패:", response.status);
      });
    };

    onMounted(() => {
      if(route.params.idx != undefined){
        fetchData();
      }
    });
    return {
      tableData,
      selectedIdx,
    };
  },
};
</script>

<style>
.btn{
  margin-left:10px;
}
.add-btn{
  float:left;
  margin: 0px 0px 10px 10px;
}
.remove-btn{
  float:left;
  margin: 0px 0px 10px 10px;
}
select{
    width: 240px;
    font-size: 18px;
    height: 38px;
    text-align: center;
}
</style>