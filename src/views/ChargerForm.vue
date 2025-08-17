<template>
  <div>
    <h4>
      충전기 관리
      <a class="btn btn-success main-btn" @click="makeExcelFile">엑셀 다운로드</a>
      <a class="btn btn-primary main-btn" data-toggle="modal" data-target="#myModal2" @click="openModal(0)">충전기 추가</a>
    </h4>
    <form class="search-from" @submit.prevent="handleSubmit">
      <input type="search" v-model="search" placeholder="아이디"/>
      <button class="displayNone" type="submit"></button>
    </form>
  
    <table class="table">
      <thead>
        <tr class="table-dark text-dark">
          <th>충전기코드</th>
          <th>충전소코드</th>
          <th>모델코드</th>
          <th>아이디</th>
          <th>미아이디</th>
          <th>상세위치</th>
          <th>파손부위</th>
          <th>비고</th>
          <th>수리일자</th>
          <th>매니저코드</th>
          <th>등록일</th>
          <th>수정일</th>
        </tr>
      </thead>
      <tbody>
        <!-- 데이터를 반복하여 동적으로 행 생성 -->
        <tr v-for="(row, index) in tableData" :key="index">
          <td>{{ row.idx }}</td>
          <td>{{ row.charger_station_idx }}</td>
          <td>{{ row.charger_model_idx }}</td>
          <td>
            <button 
              type="button" 
              class="btn btn-link" 
              data-toggle="modal" 
              data-target="#myModal" 
              @click="openModal(row)"
            >
            {{ row.charger_id }}
            </button>
          </td>
          <td>{{ row.me_id }}</td>
          <td>{{ row.detail_place }}</td>
          <td>{{ row.broken_part }}</td>
          <td>{{ row.remark }}</td>
          <td>{{ row.fixed_dt }}</td>
          <td>{{ row.manager_idx }}</td>
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
                <label class="labelModal" key="" for="charger_station_idx">충전소</label>
                <select class="form-select form-select-lg" id="charger_station_idx" v-model="selectedStationIdx">
                  <option :value=row.idx v-for="(row, index) in tableDataStation" :key="index">{{row.name}}</option>
                </select>
              </div>
              </div>
              <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="charger_model_idx">모델</label>
                <select class="form-select form-select-lg" id="charger_model_idx" v-model="selectedModelIdx">
                  <option :value=row.idx v-for="(row, index) in tableDataModel" :key="index">{{row.name}}</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="charger_id">아이디</label>
                <input 
                  type="text" 
                  id="charger_id" 
                  class="form-control"
                  v-model="selectedChargerId"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="me_id">환경부</label>
                <input 
                  type="text" 
                  id="me_id" 
                  class="form-control"
                  v-model="selectedMeId"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="detail_place">상세위치</label>
                <input 
                  type="text" 
                  id="detail_place" 
                  class="form-control"
                  v-model="selectedDetailPlace"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="broken_part">파손부위</label>
                <input 
                  type="text" 
                  id="broken_part" 
                  class="form-control"
                  v-model="selectedBrokenPart"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="remark">비고</label>
                <input 
                  type="text" 
                  id="remark" 
                  class="form-control"
                  v-model="selectedRemark"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="fixed_dt">수리일자</label>
                <VueDatePicker id="fixed_dt"  v-model="selectedFixedDt" format="yyyy-MM-dd"></VueDatePicker>
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
                <label class="labelModal" key="" for="charger_station_idx">충전소</label>
                <select class="form-select form-select-lg" id="charger_station_idx" v-model="selectedStationIdx">
                  <option :value=row.idx v-for="(row, index) in tableDataStation" :key="index">{{row.name}}</option>
                </select>
              </div>
              </div>
              <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="charger_model_idx">모델</label>
                <select class="form-select form-select-lg" id="charger_model_idx" v-model="selectedModelIdx">
                  <option :value=row.idx v-for="(row, index) in tableDataModel" :key="index">{{row.name}}</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="charger_id">아이디</label>
                <input 
                  type="text" 
                  id="charger_id" 
                  class="form-control"
                  v-model="selectedChargerId"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="me_id">환경부</label>
                <input 
                  type="text" 
                  id="me_id" 
                  class="form-control"
                  v-model="selectedMeId"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="detail_place">상세위치</label>
                <input 
                  type="text" 
                  id="detail_place" 
                  class="form-control"
                  v-model="selectedDetailPlace"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="broken_part">파손부위</label>
                <input 
                  type="text" 
                  id="broken_part" 
                  class="form-control"
                  v-model="selectedBrokenPart"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="remark">비고</label>
                <input 
                  type="text" 
                  id="remark" 
                  class="form-control"
                  v-model="selectedRemark"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="fixed_dt">수리일자</label>
                <VueDatePicker id="fixed_dt"  v-model="selectedFixedDt" format="yyyy-MM-dd"></VueDatePicker>
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
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


export default {
  components: { VueDatePicker },
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
            charger_station_idx: this.tableData[i].charger_station_idx,
            charger_model_idx: this.tableData[i].charger_model_idx,
            charger_id: this.tableData[i].charger_id,
            me_id: this.tableData[i].me_id,
            detail_place: this.tableData[i].detail_place,
            broken_part: this.tableData[i].broken_part,
            remark: this.tableData[i].remark,
            fixed_dt: this.tableData[i].fixed_dt,
            manager_idx: this.tableData[i].manager_idx,
            create_dt: this.tableData[i].create_dt,
            modify_dt: this.tableData[i].modify_dt,
          });
      }
      const workBook = Xlsx.utils.book_new();
      const workSheet = Xlsx.utils.json_to_sheet(this.excelData);
      Xlsx.utils.book_append_sheet(workBook, workSheet, 'tableData');
      Xlsx.writeFile(workBook, '충전기.xlsx');
    },
  },
  setup() {
    const search = ref("");
    const tableData = ref([]); // 테이블 데이터를 저장할 ref
    const tableDataStation = ref([]); // 테이블 데이터를 저장할 ref
    const tableDataModel = ref([]); // 테이블 데이터를 저장할 ref
    const tableDataManager = ref([]); // 테이블 데이터를 저장할 ref
    const getChargerList = process.env.VUE_APP_API_BASE_URL + "/api/charger/list";
    const getChargerStationList = process.env.VUE_APP_API_BASE_URL + "/api/chargerStation/list";
    const getManagerList = process.env.VUE_APP_API_BASE_URL + "/api/manager/list";
    const getModelList = process.env.VUE_APP_API_BASE_URL + "/api/chargerModel/list";
    const insertCharger = process.env.VUE_APP_API_BASE_URL + "/api/charger/insert";
    const updateCharger = process.env.VUE_APP_API_BASE_URL + "/api/charger/update";
    const deleteCharger = process.env.VUE_APP_API_BASE_URL + "/api/charger/delete/";

    const selectedIdx = ref(); // 선택된 행 데이터
    const selectedStationIdx = ref(); // 선택된 행 데이터
    const selectedModelIdx = ref(); // 선택된 행 데이터
    const selectedChargerId = ref(); // 선택된 행 데이터
    const selectedMeId = ref(); // 선택된 행 데이터
    const selectedDetailPlace = ref(); // 선택된 행 데이터
    const selectedBrokenPart = ref(); // 선택된 행 데이터
    const selectedRemark = ref(); // 선택된 행 데이터
    const selectedFixedDt = ref(); // 선택된 행 데이터
    const selectedManagerIdx = ref(); // 선택된 행 데이터
    const selectedCreateDt = ref(); // 선택된 행 데이터
    const selectedModifyDt = ref(); // 선택된 행 데이터
    const myModal = ref(null);
    const myModal2 = ref(null);


    const openModal = (row) => {
      selectedIdx.value = row.idx; // 선택한 행 데이터 복사
      selectedStationIdx.value = row.charger_station_idx; // 선택한 행 데이터 복사
      selectedModelIdx.value = row.charger_model_idx; // 선택한 행 데이터 복사
      selectedChargerId.value = row.charger_id; // 선택한 행 데이터 복사
      selectedMeId.value = row.me_id; // 선택한 행 데이터 복사
      selectedDetailPlace.value = row.detail_place; // 선택한 행 데이터 복사
      selectedBrokenPart.value = row.broken_part; // 선택한 행 데이터 복사
      selectedRemark.value = row.remark; // 선택한 행 데이터 복사
      selectedFixedDt.value = row.fixed_dt; // 선택한 행 데이터 복사
      selectedManagerIdx.value = row.manager_idx; // 선택한 행 데이터 복사
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
      axios.post(getChargerList+'/'+search.value,options)
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
      axios.post(getChargerList)
      .then(response=>{ 
        tableData.value = response.data; // 서버에서 받아온 데이터를 테이블에 반영
      })
      .catch(response=>{
        console.error("데이터 요청 실패:", response.status);
      });
    };

    const fetchDataStation = () => {
      axios.post(getChargerStationList)
      .then(response=>{ 
        tableDataStation.value = response.data; // 서버에서 받아온 데이터를 테이블에 반영
        console.log(tableDataStation);
      })
      .catch(response=>{
        console.error("데이터 요청 실패:", response.status);
      });
    };

    const fetchDataModel = () => {
      axios.post(getModelList)
      .then(response=>{ 
        tableDataModel.value = response.data; // 서버에서 받아온 데이터를 테이블에 반영
        console.log(tableDataModel);
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
        reqUrl = updateCharger;
      else
        reqUrl = insertCharger;
        
      const options = {
                  headers: {
                          'content-type' : 'application/json',
                          'x-api-key' : ''
                      }
                  }
      
      const date = new Date(selectedFixedDt.value);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}${month}${day}`;

      console.log(formattedDate); // "20250828"

      axios.post(reqUrl, {
            idx: selectedIdx.value,
            charger_station_idx: selectedStationIdx.value,
            charger_model_idx: selectedModelIdx.value,
            charger_id: selectedChargerId.value,
            me_id: selectedMeId.value,
            detail_place: selectedDetailPlace.value,
            broken_part: selectedBrokenPart.value,
            remark: selectedRemark.value,
            fixed_dt: formattedDate,
            manager_idx: selectedManagerIdx.value,
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
      axios.post(deleteCharger+selectedIdx.value, options)
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
      fetchDataStation();
      fetchDataModel();
      fetchDataManager();
    });

    return {
      tableData,
      tableDataStation,
      tableDataModel,
      tableDataManager,
      openModal,
      saveData,
      deleteData,
      selectedIdx,
      selectedStationIdx,
      selectedModelIdx,
      selectedChargerId,
      selectedMeId,
      selectedDetailPlace,
      selectedBrokenPart,
      selectedRemark,
      selectedFixedDt,
      selectedManagerIdx,
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
.dp--clear-btn{
  display: none;
}
.dp__main {
  width:auto;
  margin: 0px auto;
}
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

select{
    width: 347px;
    font-size: 18px;
    height: 38px;
    text-align: center;
}

</style>
