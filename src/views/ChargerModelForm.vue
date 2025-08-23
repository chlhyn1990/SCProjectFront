<template>
  <div>
    <h4>
      충전기 모델 관리
      <a class="btn btn-success main-btn" @click="makeExcelFile">엑셀 다운로드</a>
      <a class="btn btn-primary main-btn" data-toggle="modal" data-target="#myModal2" @click="openModal(0)">모델 추가</a>
    </h4>
    <form class="search-from" @submit.prevent="handleSubmit">
      <input type="search" v-model="search" placeholder="모델명"/>
      <button class="displayNone" type="submit"></button>
    </form>
  
    <table class="table">
      <thead>
        <tr class="table-dark text-dark">
          <th>인덱스</th>
          <th>회사</th>
          <th>모델명</th>
          <th>모델코드</th>
          <th>벤더</th>
          <th>속도</th>
          <th>커넥터타입</th>
          <th>커넥터번호</th>
          <th>등록일</th>
          <th>수정일</th>
        </tr>
      </thead>
      <tbody>
        <!-- 데이터를 반복하여 동적으로 행 생성 -->
        <tr v-for="(row, index) in tableData" :key="index">
          <td>{{ row.idx }}</td>
          <td>{{ row.company_name }}</td>
          <td>
            <button 
              type="button" 
              class="btn btn-link" 
              data-toggle="modal" 
              data-target="#myModal" 
              @click="openModal(row)"
            >
            {{ row.name }}
            </button>
          </td>
          <td>{{ row.code }}</td>
          <td>{{ row.vendor }}</td>
          <td>{{ row.speed }}</td>
          <td>{{ row.connector_type }}</td>
          <td>{{ row.connector_number }}</td>
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
                <label class="labelModal" key="" for="company_idx">회사코드</label>
                <select class="form-select form-select-lg" id="company_idx" v-model="selectedCompanyIdx">
                  <option :value=row.idx v-for="(row, index) in tableDataCompany" :key="index">{{row.company_name}}</option>
                </select>
              </div>
              </div>
              <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="name">모델명</label>
                <input 
                  type="text" 
                  id="name" 
                  class="form-control"
                  v-model="selectedName"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="code">모델코드</label>
                <input 
                  type="text" 
                  id="code" 
                  class="form-control"
                  v-model="selectedCode"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="vendor">벤더</label>
                <input 
                  type="text" 
                  id="vendor" 
                  class="form-control"
                  v-model="selectedVendor"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="speed">속도</label>
                <input 
                  type="text" 
                  id="speed" 
                  class="form-control"
                  v-model="selectedSpeed"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="connector_type">커넥터타입</label>
                <input 
                  type="text" 
                  id="connector_type" 
                  class="form-control"
                  v-model="selectedConnectorType"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="connector_number">커넥터번호</label>
                <input 
                  type="text" 
                  id="connector_number" 
                  class="form-control"
                  v-model="selectedConnectorNumber"
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
                <label class="labelModal" key="" for="company_idx">회사코드</label>
                <select class="form-select form-select-lg" id="company_idx" v-model="selectedCompanyIdx">
                  <option :value=row.idx v-for="(row, index) in tableDataCompany" :key="index">{{row.company_name}}</option>
                </select>
              </div>
              </div>
              <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="anem">모델명</label>
                <input 
                  type="text" 
                  id="name" 
                  class="form-control"
                  v-model="selectedName"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="code">모델코드</label>
                <input 
                  type="text" 
                  id="code" 
                  class="form-control"
                  v-model="selectedCode"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="vendor">벤더</label>
                <input 
                  type="text" 
                  id="vendor" 
                  class="form-control"
                  v-model="selectedVendor"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="speed">속도</label>
                <input 
                  type="text" 
                  id="speed" 
                  class="form-control"
                  v-model="selectedSpeed"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="connector_type">커넥터타입</label>
                <input 
                  type="text" 
                  id="connector_type" 
                  class="form-control"
                  v-model="selectedConnectorType"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="connector_number">커넥터번호</label>
                <input 
                  type="text" 
                  id="connector_number" 
                  class="form-control"
                  v-model="selectedConnectorNumber"
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
            name: this.tableData[i].name,
            code: this.tableData[i].code,
            vendor: this.tableData[i].vendor,
            speed: this.tableData[i].speed,
            connector_type: this.tableData[i].connector_type,
            connector_number: this.tableData[i].connector_number,
            create_dt: this.tableData[i].create_dt,
            modify_dt: this.tableData[i].modify_dt,
          });
      }
      const workBook = Xlsx.utils.book_new();
      const workSheet = Xlsx.utils.json_to_sheet(this.excelData);
      Xlsx.utils.book_append_sheet(workBook, workSheet, 'tableData');
      Xlsx.writeFile(workBook, '충전기모델.xlsx');
    },
  },
  setup() {
    const search = ref("");
    const tableData = ref([]); // 테이블 데이터를 저장할 ref
    const tableDataCompany = ref([]); // 테이블 데이터를 저장할 ref
    const getChargerModelList = process.env.VUE_APP_API_BASE_URL + "/api/chargerModel/list";
    const getCompanyList = process.env.VUE_APP_API_BASE_URL + "/api/company/list";
    const insertChargerModel = process.env.VUE_APP_API_BASE_URL + "/api/chargerModel/insert";
    const updateChargerModel = process.env.VUE_APP_API_BASE_URL + "/api/chargerModel/update";
    const deleteChargerModel = process.env.VUE_APP_API_BASE_URL + "/api/chargerModel/delete/";

    const selectedIdx = ref(); // 선택된 행 데이터
    const selectedCompanyIdx = ref(); // 선택된 행 데이터
    const selectedName = ref(); // 선택된 행 데이터
    const selectedCode = ref(); // 선택된 행 데이터
    const selectedVendor = ref(); // 선택된 행 데이터
    const selectedSpeed = ref(); // 선택된 행 데이터
    const selectedConnectorType = ref(); // 선택된 행 데이터
    const selectedConnectorNumber = ref(); // 선택된 행 데이터
    const selectedCreateDt = ref(); // 선택된 행 데이터
    const selectedModifyDt = ref(); // 선택된 행 데이터
    const myModal = ref(null);
    const myModal2 = ref(null);


    const openModal = (row) => {
      selectedIdx.value = row.idx; // 선택한 행 데이터 복사
      selectedCompanyIdx.value = row.company_idx; // 선택한 행 데이터 복사
      selectedName.value = row.name; // 선택한 행 데이터 복사
      selectedCode.value = row.code; // 선택한 행 데이터 복사
      selectedVendor.value = row.vendor; // 선택한 행 데이터 복사
      selectedSpeed.value = row.speed; // 선택한 행 데이터 복사
      selectedConnectorType.value = row.connector_type; // 선택한 행 데이터 복사
      selectedConnectorNumber.value = row.connector_number; // 선택한 행 데이터 복사
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
      axios.post(getChargerModelList+'/'+search.value,options)
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
      axios.post(getChargerModelList)
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

    const saveData = () => {
      var reqUrl;

      if(selectedIdx.value != '' && selectedIdx.value != undefined)
        reqUrl = updateChargerModel;
      else
        reqUrl = insertChargerModel;
        
      const options = {
                  headers: {
                          'content-type' : 'application/json',
                          'x-api-key' : ''
                      }
                  }
      axios.post(reqUrl, {
            idx: selectedIdx.value,
            company_idx: selectedCompanyIdx.value,
            name: selectedName.value,
            code: selectedCode.value,
            vendor: selectedVendor.value,
            speed: selectedSpeed.value,
            connector_type: selectedConnectorType.value,
            connector_number: selectedConnectorNumber.value,
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
      axios.post(deleteChargerModel+selectedIdx.value, options)
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
    });

    return {
      tableData,
      tableDataCompany,
      openModal,
      saveData,
      deleteData,
      selectedIdx,
      selectedCompanyIdx,
      selectedName,
      selectedCode,
      selectedVendor,
      selectedSpeed,
      selectedConnectorType,
      selectedConnectorNumber,
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

</style>
