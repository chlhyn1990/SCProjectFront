<template>
  <div>
    <h4>
      <img class="image" src="../images/circle.png" alt="이미지">
      에너지 수요관리 시스템
    </h4>
    <p class="bold">
      <router-link to="/AdminSettingForm" class="sublink1">설정 >></router-link>
    </p>
    <table class="table">
      <thead>
        <tr class="table-dark text-dark">
          <th rowspan="2" class="thRow2">User</th>
          <th colspan="3">{{month}}월 누적 전력사용량 (kWh)</th>
        </tr>
        <tr class="table-dark text-dark">
          <th>HOME</th>
          <th>EV</th>
          <th>합계</th>
        </tr>
      </thead>
      <tbody>
        <!-- 데이터를 반복하여 동적으로 행 생성 -->
        <tr v-for="(row, index) in monthlyUsage" :key="index">
          <td>{{ row.ami_mid }}</td>
          <td>{{ row.ami_meter }}</td>
          <td>{{ row.ev_meter }}</td>
          <td>{{ row.sum_meter }}</td>
        </tr>
      </tbody>
    </table>

    <table class="table">
      <thead>
        <tr class="table-dark text-dark">
          <th rowspan="2" class="thRow2">User</th>
          <th colspan="3">{{month}}월 최대 사용전력 (kW)</th>
        </tr>
        <tr class="table-dark text-dark">
          <th>HOME</th>
          <th>EV</th>
          <th>합계</th>
        </tr>
      </thead>
      <tbody>
        <!-- 데이터를 반복하여 동적으로 행 생성 -->
        <tr v-for="(row, index) in monthlyMaxUsage" :key="index">
          <td>{{ row.ami_mid }}</td>
          <td>{{ row.ami_meter }}</td>
          <td>{{ row.ev_meter }}</td>
          <td>{{ row.sum_meter }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const monthlyUsage = ref([]); // 테이블 데이터를 저장할 ref
    const monthlyMaxUsage = ref([]); // 테이블 데이터를 저장할 ref
    const monthlyUsageUrl = "http://localhost/api/";
    const monthlyMaxUsageUrl = "http://localhost/api/";

    // 오늘 날짜 반환 함수
    const getTodayMonth = () => {
      const today = new Date();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      return `${month}`;
    };

    const month = getTodayMonth();

    const fetchData = () => {
      axios.post(monthlyUsageUrl)
      .then(response=>{ 
        monthlyUsage.value = response.data; // 서버에서 받아온 데이터를 테이블에 반영
        console.log(monthlyUsage.value);
      })
      .catch(response=>{
        console.error("데이터 요청 실패:", response.status);
      });

      axios.post(monthlyMaxUsageUrl)
      .then(response=>{ 
        monthlyMaxUsage.value = response.data; // 서버에서 받아온 데이터를 테이블에 반영
        console.log(monthlyMaxUsage.value);
      })
      .catch(response=>{
        console.error("데이터 요청 실패:", response.status);
      });
      
    };

    onMounted(() => {
      fetchData(); // 컴포넌트 마운트 시 데이터 가져오기
    });

    return {
      monthlyUsage,
      monthlyMaxUsage, 
      month,
    };
  },
};
</script>

<style>
.image {
  width: 60px;
  vertical-align: middle;
}

.sublink1 {
  float: right;
  padding-right: 10px;
  padding-bottom: 10px;
  text-decoration-line: underline;
  font-weight: normal;
  font-size: 10pt;
  color: black;
}

.table {
  font-size: 10pt !important;
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th {
  border: 1px solid #333 !important;
  text-align: center;
  vertical-align: middle !important;
}

td {
  border: 1px solid #333 !important;
  text-align: center;
  vertical-align: middle !important;
}

.thRow2 {
  vertical-align: middle;
  width: 127px;
}
</style>
