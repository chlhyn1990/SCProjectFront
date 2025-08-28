<template>
  <div>
    <h4>
      충전소 관리
      <a class="btn btn-success main-btn" @click="makeExcelFile">엑셀 다운로드</a>
      <router-link class="btn btn-primary main-btn" to="/ChargerStationInsertFormNew">충전소 추가</router-link>
    </h4>
    <form class="search-from" @submit.prevent="handleSubmit">
      <input type="search" v-model="search" placeholder="충전소명"/>
      <button class="displayNone" type="submit"></button>
    </form>
  
    <table class="table">
      <thead>
        <tr class="table-dark text-dark">
          <th>인덱스</th>
          <th>회사</th>
          <th>매니저</th>
          <th>충전소명</th>
          <th>충전기제조사</th>
          <th>충전사업자</th>
          <th>주소</th>
          <th>상세주소</th>
          <th>위도</th>
          <th>경도</th>
          <th>충전기전압</th>
          <th>충전기용량</th>
          <th>충전기설치유형</th>
          <th>상태미확인결과</th>
          <th>등록일</th>
          <th>수정일</th>
        </tr>
      </thead>
      <tbody>
        <!-- 데이터를 반복하여 동적으로 행 생성 -->
        <tr v-for="(row, index) in tableData" :key="index">
          <td>{{ row.idx }}</td>
          <td>{{ row.company_name }}</td>
          <td>{{ row.manager_name }}</td>
          <td><router-link :to="`/ChargerStationInsertForm/${ row.idx }`">{{ row.name }}</router-link></td>
          <td>{{ row.chargerCompany }}</td>
          <td>{{ row.station_id }}</td>
          <td>{{ row.addr }}</td>
          <td>{{ row.detail_addr }}</td>
          <td>{{ row.latitude }}</td>
          <td>{{ row.longitude }}</td>
          <td>{{ row.volt }}</td>
          <td>{{ row.watt }}</td>
          <td>{{ row.chargerType }}</td>
          <td>{{ row.result }}</td>
          <td>{{ row.create_dt }}</td>
          <td>{{ row.modify_dt }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>


<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import * as Xlsx from 'xlsx';

export default {
  data(){
    return{
      excelData:[]
    }
  },
  methods: {
    makeExcelFile (){
      for(var i=0; i<this.tableData.length;i++){
        this.excelData.push({
            idx: this.tableData[i].idx,
            company_idx: this.tableData[i].company_name,
            manager_idx: this.tableData[i].manager_name,
            name: this.tableData[i].name,
            chargerCompany: this.tableData[i].chargerCompany,
            station_id: this.tableData[i].station_id,
            addr: this.tableData[i].addr,
            detail_addr: this.tableData[i].detail_addr,
            latitude: this.tableData[i].latitude,
            longitude: this.tableData[i].longitude,
            volt: this.tableData[i].volt,
            watt: this.tableData[i].watt,
            chargerType: this.tableData[i].chargerType,
            result: this.tableData[i].result,
            create_dt: this.tableData[i].create_dt,
            modify_dt: this.tableData[i].modify_dt,
          });
      }
      const workBook = Xlsx.utils.book_new();
      const workSheet = Xlsx.utils.json_to_sheet(this.excelData);
      Xlsx.utils.book_append_sheet(workBook, workSheet, 'tableData');
      Xlsx.writeFile(workBook, '충전소.xlsx');
    },
  },
  setup() {

    const search = ref("");
    const tableData = ref([]); // 테이블 데이터를 저장할 ref
    const tableDataCompany = ref([]); // 테이블 데이터를 저장할 ref
    const tableDataManager = ref([]); // 테이블 데이터를 저장할 ref
    const getChargerStationList = process.env.VUE_APP_API_BASE_URL + "/api/chargerStation/list";
    
    const handleSubmit = () => {
      console.log(search.value);
      const options = {
                  headers: {
                          'content-type' : 'application/json',
                          'x-api-key' : ''
                      }
                  }
      axios.post(getChargerStationList+'/'+search.value,options)
      .then(response=>{ 
        if(response.data.length == 0){
          alert('조회 데이터가 없습니다');
          fetchData();
        }
        tableData.value = response.data; // 서버에서 받아온 데이터를 테이블에 반영
      })
      .catch(response=>{
        console.error("데이터 요청 실패:", response.status);
      });
    };

    const fetchData = () => {
      axios.post(getChargerStationList)
      .then(response=>{ 
        tableData.value = response.data; // 서버에서 받아온 데이터를 테이블에 반영
      })
      .catch(response=>{
        console.error("데이터 요청 실패:", response.status);
      });
    };

    onMounted(() => {
      fetchData(); // 컴포넌트 마운트 시 데이터 가져오기
    });

    return {
      search,
      tableData,
      tableDataCompany,
      tableDataManager,
      handleSubmit,
    };
  },
};
</script>

<style>
.search-from{
  width:800px;
  margin: 0px auto;
}
.search-from input{
  text-align: center;
  display: inline-block;
  width:200px;
  margin-left:10px;
  margin-right:10px;
}
.search-from .displayNone{
  display: none;
}
.form-control{
  text-align:center;
}
.main-btn{
  float:right;
  margin: 0px 0px 10px 10px;
}
.btn{
  width:auto;
}


.table {
  font-size: 10pt !important;
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.table-black{
  background-color: #333 !important;
  color: #fff;
  border: 1px solid #fff !important;
}

th {
  border: 1px solid #333 !important;
  text-align: center;
  vertical-align: middle !important;
  padding:2px !important;
}

td {
  border: 1px solid #333 !important;
  text-align: center;
  vertical-align: middle !important;
  padding:2px !important;
}

</style>
