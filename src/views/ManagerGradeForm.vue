<template>
  <div>
    <h4>
      매니저 등급 관리
      <a class="btn btn-success main-btn" @click="makeExcelFile">엑셀 다운로드</a>
      <a class="btn btn-primary main-btn" data-toggle="modal" data-target="#myModal2" @click="openModal(0)">등급 추가</a>
    </h4>
    <form class="search-from" @submit.prevent="handleSubmit">
      <input type="search" v-model="search" placeholder="등급명"/>
      <button class="displayNone" type="submit"></button>
    </form>
  
    <table class="table">
      <thead>
        <tr class="table-dark text-dark">
          <th>등급코드</th>
          <th>등급명</th>
          <th>등록일</th>
          <th>수정일</th>
        </tr>
      </thead>
      <tbody>
        <!-- 데이터를 반복하여 동적으로 행 생성 -->
        <tr v-for="(row, index) in tableData" :key="index">
          <td>{{ row.idx }}</td>
          <td>
            <button 
              type="button" 
              class="btn btn-link" 
              data-toggle="modal" 
              data-target="#myModal" 
              @click="openModal(row)"
            >
            {{ row.grade_name }}
            </button>
          </td>
          <td>{{ row.create_dt }}</td>
          <td>{{ row.modify_dt }}</td>
        </tr>
      </tbody>
    </table>

    <!-- The Modal -->
    <div  class="modal fade" id="myModal" ref="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
           <!--
          <div class="modal-header">
            <h4 class="modal-title ">{{ selectedIdx}}</h4>
          </div>
          -->
          <!-- Modal Body -->
          <div class="modal-body">
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="grade_name">매니저등급</label>
                <input 
                  type="text" 
                  id="grade_name" 
                  class="form-control"
                  v-model="selectedGradeName"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" for="create_dt">등록일자</label>
                <input 
                  type="text" 
                  id="create_dt" 
                  v-model="selectedCreateDt"
                  class="form-control"
                  readonly="true"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal"  for="modify_dt">수정일자</label>
                <input 
                  type="text" 
                  id="modify_dt" 
                  v-model="selectedModifyDt"
                  class="form-control"
                  readonly="true"
                />
              </div>
            </div>
          </div>
          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-success"  @click="saveData" data-dismiss="modal">저장</button>
            <button type="button" class="btn btn-dark"  @click="deleteData" data-dismiss="modal">삭제</button>
          </div>
        </div>
      </div>
    </div>

    <!-- The Modal -->
    <div  class="modal fade" id="myModal2" ref="myModal2">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
           <!--
          <div class="modal-header">
            <h4 class="modal-title ">{{ selectedIdx}}</h4>
          </div>
          -->
          <!-- Modal Body -->
          <div class="modal-body">
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="grade_name">매니저등급</label>
                <input 
                  type="text" 
                  id="grade_name" 
                  class="form-control"
                  v-model="selectedGradeName"
                />
              </div>
            </div>
          </div>
          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-success"  @click="saveData" data-dismiss="modal">저장</button>
          </div>
        </div>
      </div>
    </div>

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
            grade_name: this.tableData[i].grade_name,
            create_dt: this.tableData[i].create_dt,
            modify_dt: this.tableData[i].modify_dt,
          });
      }
      const workBook = Xlsx.utils.book_new();
      const workSheet = Xlsx.utils.json_to_sheet(this.excelData);
      Xlsx.utils.book_append_sheet(workBook, workSheet, 'tableData');
      Xlsx.writeFile(workBook, '매니저등급.xlsx');
    },
  },
  setup() {
    const search = ref("");
    const tableData = ref([]); // 테이블 데이터를 저장할 ref
    const getCompanyGradeList = process.env.VUE_APP_API_BASE_URL + "/api/managerGrade/list";
    const insertCompanyGrade = process.env.VUE_APP_API_BASE_URL + "/api/managerGrade/insert";
    const updateCompanyGrade = process.env.VUE_APP_API_BASE_URL + "/api/managerGrade/update";
    const deleteCompanyGrade = process.env.VUE_APP_API_BASE_URL + "/api/managerGrade/delete/";
    const selectedIdx = ref(); // 선택된 행 데이터
    const selectedGradeName = ref(); // 선택된 행 데이터
    const selectedCreateDt = ref(); // 선택된 행 데이터
    const selectedModifyDt = ref(); // 선택된 행 데이터
    const myModal = ref(null);
    const myModal2 = ref(null);


    const openModal = (row) => {
      selectedIdx.value = row.idx; // 선택한 행 데이터 복사
      selectedGradeName.value = row.grade_name; // 선택한 행 데이터 복사
      selectedCreateDt.value = row.create_dt; // 선택한 행 데이터 복사
      selectedModifyDt.value = row.modify_dt; // 선택한 행 데이터 복사
    };

    const handleSubmit = () => {
      console.log(search.value);
      const options = {
                  headers: {
                          'content-type' : 'application/json',
                          'x-api-key' : ''
                      }
                  }
      axios.post(getCompanyGradeList+'/'+search.value,options)
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
      axios.post(getCompanyGradeList)
      .then(response=>{ 
        tableData.value = response.data; // 서버에서 받아온 데이터를 테이블에 반영
      })
      .catch(response=>{
        console.error("데이터 요청 실패:", response.status);
      });
    };

    const saveData = () => {
      var reqUrl;

      if(selectedIdx.value != '' && selectedIdx.value != undefined)
        reqUrl = updateCompanyGrade;
      else
        reqUrl = insertCompanyGrade;
        
      const options = {
                  headers: {
                          'content-type' : 'application/json',
                          'x-api-key' : ''
                      }
                  }
      axios.post(reqUrl, {
            idx: selectedIdx.value,
            grade_name: selectedGradeName.value,
            create_dt: selectedCreateDt.value,
            modify_dt: selectedModifyDt.value
          }, options)
      .then(response=>{ 
        console.log(response.data); // 서버에서 받아온 데이터를 테이블에 반영
        alert('저장되었습니다');
        fetchData();
      })
      .catch(response=>{
        console.error("데이터 요청 실패:", response.status);
      });
    };

    const deleteData = () => {
      const options = {
                  headers: {
                          'content-type' : 'application/json',
                          'x-api-key' : ''
                      }
                  }
      axios.post(deleteCompanyGrade+selectedIdx.value, options)
      .then(response=>{ 
        console.log(response.data); // 서버에서 받아온 데이터를 테이블에 반영
        alert('삭제되었습니다');
        fetchData();
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
      openModal,
      saveData,
      deleteData,
      selectedIdx,
      selectedGradeName,
      selectedCreateDt,
      selectedModifyDt,
      myModal,
      myModal2,
      search,
      handleSubmit,
    };
  },
};
</script>

<style>
.search-from{
  width:200px;
  margin: 0px auto;
}
.search-from input{
  text-align: center;
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

</style>
