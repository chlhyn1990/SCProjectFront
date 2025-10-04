<template>
  <div>
    <h4>
      점검표 관리
      <a class="btn btn-success main-btn" @click="makeExcelFile">엑셀 다운로드</a>
    </h4>
    <form class="search-from" @submit.prevent="handleSubmit">
            <input type="search" v-model="searchCompany" placeholder="회사명"/>
            <input type="search" v-model="searchManager" placeholder="매니저명"/>
            <input type="search" v-model="searchChargerStation" placeholder="충전소명"/>
      <button class="displayNone" type="submit"></button>
    </form>
  
    <table class="table">
      <thead>
        <tr class="table-dark text-dark">
          <th>인덱스</th>
          <th>회사</th>
          <th>매니저</th>
          <th>충전소</th>
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
          <td><router-link :to="`/CheckMstlistForm/${ row.idx }`">{{ row.name }}</router-link></td>
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
            company_name: this.tableData[i].company_name,
            manager_name: this.tableData[i].manager_name,
            charger_station_name: this.tableData[i].charger_station_name,
            create_dt: this.tableData[i].create_dt,
            modify_dt: this.tableData[i].modify_dt,
          });
      }
      const workBook = Xlsx.utils.book_new();
      const workSheet = Xlsx.utils.json_to_sheet(this.excelData);
      Xlsx.utils.book_append_sheet(workBook, workSheet, 'tableData');
      Xlsx.writeFile(workBook, '점검표.xlsx'); 
    },
  },
  setup() {
    const searchCompany = ref("");
    const searchManager = ref("");
    const searchChargerStation = ref("");
    const tableData = ref([]); // 테이블 데이터를 저장할 ref
    const getChargerStationList = process.env.VUE_APP_API_BASE_URL + "/api/chargerStation/list";

    const selectedIdx = ref(); // 선택된 행 데이터

    const handleSubmit = () => {
      const options = {
                  headers: {
                          'content-type' : 'application/json',
                          'x-api-key' : ''
                      }
                  }
      const search = {
        searchCompany: searchCompany.value,
        searchManager: searchManager.value,
        searchChargerStation: searchChargerStation.value,
      }
      axios.post(getChargerStationList, search, options)
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
      const options = {
                  headers: {
                          'content-type' : 'application/json',
                          'x-api-key' : ''
                      }
                  }
      const search = {
        searchCompany: searchCompany.value,
        searchManager: searchManager.value,
        searchChargerStation: searchChargerStation.value,
      }
      axios.post(getChargerStationList, search, options)
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
      tableData,
      selectedIdx,
      searchCompany,
      searchManager,
      searchChargerStation,
      handleSubmit,
    };
  },
};
</script>

<style>
.dp--clear-btn{
  display: none;
}
.dp__main {
  width:auto;
  margin: 0px auto;
}
.search-from{
  width:800px;
  margin: 0px auto;
  text-align: center;
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
.labelModal{
    vertical-align: middle !important;
    padding-right: 30px;
    padding-left: 30px;
    margin-bottom:0px !important;
}
.form-control{
  text-align:center;
}
.modal-header{
  display: block;
}
.modal-title{
  text-align: center;
}
.modal{
  margin-top:100px;
}
.main-btn{
  float:right;
  margin: 0px 0px 10px 10px;
}
.btn{
  width:auto;
}
.btn-link{
  font-size: 10pt;
}
.btn-link:hover{
  background-color: #fff;
}
.sublink1 {
  float: right;
  text-decoration-line: underline;
  font-weight: normal;
  color: black;
}
.sublink1:hover {
  cursor: pointer;
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

.thRow2 {
  vertical-align: middle;
}

select{
    width: 347px;
    font-size: 18px;
    height: 38px;
    text-align: center;
}
.searchInput{
  display: inline-block;
  width:200px;
  margin-left:10px;
  margin-right:10px;
}

</style>
