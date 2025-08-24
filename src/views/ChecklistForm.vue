<template>
  <div>
    <h4>
      체크리스트 관리
      <a class="btn btn-success main-btn" @click="makeExcelFile">엑셀 다운로드</a>
      <a class="btn btn-primary main-btn" data-toggle="modal" data-target="#myModal2" @click="openModal(0)">체크리스트 추가</a>
    </h4>
    <form class="search-from" @submit.prevent="handleSubmit">
            <input type="search" v-model="searchCompany" placeholder="회사명"/>
            <input type="search" v-model="searchManager" placeholder="매니저명"/>
            <input type="search" v-model="searchName" placeholder="항목명"/>
      <button class="displayNone" type="submit"></button>
    </form>
  
    <table class="table">
      <thead>
        <tr class="table-dark text-dark">
          <th>인덱스</th>
          <th>회사</th>
          <th>매니저</th>
          <th>항목명</th>
          <th>행</th>
          <th>열</th>
          <th>순서</th>
          <th>사진여부</th>
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
          <td>
            <button 
              type="button" 
              class="btn btn-link" 
              data-toggle="modal" 
              data-target="#myModal" 
              @click="openModal(row)"
            >
            {{ row.checking_name }}
            </button>
          </td>
          <td>{{ row.row }}</td>
          <td>{{ row.col }}</td>
          <td>{{ row.ord }}</td>
          <td>{{ row.photo_yn }}</td>
          <td>{{ row.create_dt }}</td>
          <td>{{ row.modify_dt }}</td>
        </tr>
      </tbody>
    </table>

    <!-- The Modal -->
    <div  class="modal fade" id="myModal" ref="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="company_idx">회사</label>
                <select class="form-select form-select-lg" id="company_idx" v-model="selectedCompanyIdx">
                  <option :value=row.idx v-for="(row, index) in tableDataCompany" :key="index">{{row.company_name}}</option>
                </select>
              </div>
              </div>
              <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="manager_idx">매니저</label>
                <select class="form-select form-select-lg" id="manager_idx" v-model="selectedManagerIdx">
                  <option :value=row.idx v-for="(row, index) in tableDataManager" :key="index">{{row.name}}</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="checking_name">항목명</label>
                <input 
                  type="text" 
                  id="checking_name" 
                  class="form-control"
                  v-model="selectedCheckingName"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="row">행</label>
                <input 
                  type="text" 
                  id="row" 
                  class="form-control"
                  v-model="selectedRow"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="col">열</label>
                <input 
                  type="text" 
                  id="col" 
                  class="form-control"
                  v-model="selectedCol"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="ord">순서</label>
                <input 
                  type="text" 
                  id="ord" 
                  class="form-control"
                  v-model="selectedOrd"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="photo_yn">사진여부</label>
                <input 
                  type="text" 
                  id="photo_yn" 
                  class="form-control"
                  v-model="selectedPhotoYn"
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
          <div class="modal-body">
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="company_idx">회사</label>
                <select class="form-select form-select-lg" id="company_idx" v-model="selectedCompanyIdx">
                  <option :value=row.idx v-for="(row, index) in tableDataCompany" :key="index">{{row.company_name}}</option>
                </select>
              </div>
              </div>
              <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="manager_idx">매니저</label>
                <select class="form-select form-select-lg" id="manager_idx" v-model="selectedManagerIdx">
                  <option :value=row.idx v-for="(row, index) in tableDataManager" :key="index">{{row.name}}</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="checking_name">항목명</label>
                <input 
                  type="text" 
                  id="checking_name" 
                  class="form-control"
                  v-model="selectedCheckingName"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="row">행</label>
                <input 
                  type="text" 
                  id="row" 
                  class="form-control"
                  v-model="selectedRow"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="col">열</label>
                <input 
                  type="text" 
                  id="col" 
                  class="form-control"
                  v-model="selectedCol"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="ord">순서</label>
                <input 
                  type="text" 
                  id="ord" 
                  class="form-control"
                  v-model="selectedOrd"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="photo_yn">사진여부</label>
                <input 
                  type="text" 
                  id="photo_yn" 
                  class="form-control"
                  v-model="selectedPhotoYn"
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
            company_idx: this.tableData[i].company_idx,
            manager_idx: this.tableData[i].manager_idx,
            checking_name: this.tableData[i].checking_name,
            row: this.tableData[i].row,
            col: this.tableData[i].col,
            ord: this.tableData[i].ord,
            photo_yn: this.tableData[i].photo_yn,
            create_dt: this.tableData[i].create_dt,
            modify_dt: this.tableData[i].modify_dt,
          });
      }
      const workBook = Xlsx.utils.book_new();
      const workSheet = Xlsx.utils.json_to_sheet(this.excelData);
      Xlsx.utils.book_append_sheet(workBook, workSheet, 'tableData');
      Xlsx.writeFile(workBook, '체크리스트.xlsx'); 
    },
  },
  setup() {
    const searchCompany = ref("");
    const searchManager = ref("");
    const searchName = ref("");
    const tableData = ref([]); // 테이블 데이터를 저장할 ref
    const tableDataCompany = ref([]); // 테이블 데이터를 저장할 ref
    const tableDataManager = ref([]); // 테이블 데이터를 저장할 ref
    const getCheckListList = process.env.VUE_APP_API_BASE_URL + "/api/checkList/list";
    const getCompanyList = process.env.VUE_APP_API_BASE_URL + "/api/company/list";
    const getManagerList = process.env.VUE_APP_API_BASE_URL + "/api/manager/list";
    const insertCheckList = process.env.VUE_APP_API_BASE_URL + "/api/checkList/insert";
    const updateCheckList = process.env.VUE_APP_API_BASE_URL + "/api/checkList/update";
    const deleteCheckList = process.env.VUE_APP_API_BASE_URL + "/api/checkList/delete/";

    const selectedIdx = ref(); // 선택된 행 데이터
    const selectedCompanyIdx = ref(); // 선택된 행 데이터
    const selectedManagerIdx = ref(); // 선택된 행 데이터
    const selectedCheckingName = ref(); // 선택된 행 데이터
    const selectedRow = ref(); // 선택된 행 데이터
    const selectedCol = ref(); // 선택된 행 데이터
    const selectedOrd = ref(); // 선택된 행 데이터
    const selectedPhotoYn = ref(); // 선택된 행 데이터
    const selectedCreateDt = ref(); // 선택된 행 데이터
    const selectedModifyDt = ref(); // 선택된 행 데이터
    const myModal = ref(null);
    const myModal2 = ref(null);


    const openModal = (row) => {
      selectedIdx.value = row.idx; // 선택한 행 데이터 복사
      selectedCompanyIdx.value = row.company_idx; // 선택한 행 데이터 복사
      selectedManagerIdx.value = row.manager_idx; // 선택한 행 데이터 복사
      selectedCheckingName.value = row.checking_name; // 선택한 행 데이터 복사
      selectedRow.value = row.row; // 선택한 행 데이터 복사
      selectedCol.value = row.col; // 선택한 행 데이터 복사
      selectedOrd.value = row.ord; // 선택한 행 데이터 복사
      selectedPhotoYn.value = row.photo_yn; // 선택한 행 데이터 복사
      selectedCreateDt.value = row.create_dt; // 선택한 행 데이터 복사
      selectedModifyDt.value = row.modify_dt; // 선택한 행 데이터 복사
    };

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
        searchName: searchName.value,
      }
      axios.post(getCheckListList, search, options)
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
      axios.post(getCheckListList)
      .then(response=>{ 
        tableData.value = response.data; // 서버에서 받아온 데이터를 테이블에 반영
      })
      .catch(response=>{
        console.error("데이터 요청 실패:", response.status);
      });
    };

    const fetchDataCompany = () => {
      axios.post(getCompanyList)
      .then(response=>{ 
        tableDataCompany.value = response.data; // 서버에서 받아온 데이터를 테이블에 반영
        console.log(tableDataCompany);
      })
      .catch(response=>{
        console.error("데이터 요청 실패:", response.status);
      });
    };

    const fetchDataManager = () => {
      axios.post(getManagerList)
      .then(response=>{ 
        tableDataManager.value = response.data; // 서버에서 받아온 데이터를 테이블에 반영
        console.log(tableDataManager);
      })
      .catch(response=>{
        console.error("데이터 요청 실패:", response.status);
      });
    };

    const saveData = () => {
      var reqUrl;

      if(selectedIdx.value != '' && selectedIdx.value != undefined)
        reqUrl = updateCheckList;
      else
        reqUrl = insertCheckList;
        
      const options = {
                  headers: {
                          'content-type' : 'application/json',
                          'x-api-key' : ''
                      }
                  }

      axios.post(reqUrl, {
            idx: selectedIdx.value,
            company_idx: selectedCompanyIdx.value,
            manager_idx: selectedManagerIdx.value,
            checking_name: selectedCheckingName.value,
            row: selectedRow.value,
            col: selectedCol.value,
            ord: selectedOrd.value,
            photo_yn: selectedPhotoYn.value,
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
      axios.post(deleteCheckList+selectedIdx.value, options)
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
      fetchDataCompany();
      fetchDataManager();
    });

    return {
      tableData,
      tableDataCompany,
      tableDataManager,
      openModal,
      saveData,
      deleteData,
      selectedIdx,
      selectedCompanyIdx,
      selectedManagerIdx,
      selectedCheckingName,
      selectedRow,
      selectedCol,
      selectedOrd,
      selectedPhotoYn,
      selectedCreateDt,
      selectedModifyDt,
      myModal,
      myModal2,
      searchName,
      searchCompany,
      searchManager,
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
