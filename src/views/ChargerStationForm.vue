<template>
  <div>
    <h4>
      충전소 관리
      <a class="btn btn-success main-btn" @click="makeExcelFile">엑셀 다운로드</a>
      <a class="btn btn-primary main-btn" data-toggle="modal" data-target="#myModal2" @click="openModal(0)">충전소 추가</a>
    </h4>
    <form class="search-from" @submit.prevent="handleSubmit">
      <input type="search" v-model="search" placeholder="충전소명"/>
      <button class="displayNone" type="submit"></button>
    </form>
  
    <table class="table">
      <thead>
        <tr class="table-dark text-dark">
          <th>충전소코드</th>
          <th>회사코드</th>
          <th>매니저코드</th>
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
          <td>{{ row.company_idx }}</td>
          <td>{{ row.manager_idx }}</td>
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
                <label class="labelModal" key="" for="anem">매니저</label>
                <select class="form-select form-select-lg" id="manager_idx" v-model="selectedManagerIdx">
                  <option :value=row.idx v-for="(row, index) in tableDataManager" :key="index">{{row.name}}</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="name">충전소명</label>
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
                <label class="labelModal" key="" for="chargerCompany">충전기제조사</label>
                <input 
                  type="text" 
                  id="chargerCompany" 
                  class="form-control"
                  v-model="selectedChargerCompany"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="station_id">충전사업자</label>
                <input 
                  type="text" 
                  id="station_id" 
                  class="form-control"
                  v-model="selectedStationId"
                />
              </div>
            </div>
            
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="addr">주소</label>
                <input 
                  type="text" 
                  id="addr" 
                  class="form-control"
                  v-model="selectedAddr"
                />
                <button class="btn btn-secondary" @click="findAddress()">주소찾기</button>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="detail_addr">상세주소</label>
                <input 
                  type="text" 
                  id="detail_addr" 
                  class="form-control"
                  v-model="selectedDetailAddr"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="latitude">위도</label>
                <input 
                  type="text" 
                  id="latitude" 
                  class="form-control"
                  v-model="selectedLatitude"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="longitude">경도</label>
                <input 
                  type="text" 
                  id="longitude" 
                  class="form-control"
                  v-model="selectedLongitude"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="volt">충전기전압</label>
                <input 
                  type="text" 
                  id="volt" 
                  class="form-control"
                  v-model="selectedVolt"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="watt">충전기용량</label>
                <input 
                  type="text" 
                  id="watt" 
                  class="form-control"
                  v-model="selectedWatt"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="chargerType">충전기설치유형</label>
                <input 
                  type="text" 
                  id="chargerType" 
                  class="form-control"
                  v-model="selectedChargerType"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="result">상태미확인결과</label>
                <input 
                  type="text" 
                  id="result" 
                  class="form-control"
                  v-model="selectedResult"
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
                <label class="labelModal" key="" for="name">충전소명</label>
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
                <label class="labelModal" key="" for="chargerCompany">충전기제조사</label>
                <input 
                  type="text" 
                  id="chargerCompany" 
                  class="form-control"
                  v-model="selectedChargerCompany"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="station_id">충전사업자</label>
                <input 
                  type="text" 
                  id="station_id" 
                  class="form-control"
                  v-model="selectedStationId"
                />
              </div>
            </div>
            
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="addr">주소</label>
                <input 
                  type="text" 
                  id="addr" 
                  class="form-control"
                  v-model="selectedAddr"
                  readonly="true"
                />
                <button class="btn btn-secondary" @click="findAddress()">주소찾기</button>
                <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true">
                  <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
                </KakaoMap>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="detail_addr">상세주소</label>
                <input 
                  type="text" 
                  id="detail_addr" 
                  class="form-control"
                  v-model="selectedDetailAddr"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="latitude">위도</label>
                <input 
                  type="text" 
                  id="latitude" 
                  class="form-control"
                  v-model="selectedLatitude"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="longitude">경도</label>
                <input 
                  type="text" 
                  id="longitude" 
                  class="form-control"
                  v-model="selectedLongitude"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="volt">충전기전압</label>
                <input 
                  type="text" 
                  id="volt" 
                  class="form-control"
                  v-model="selectedVolt"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="watt">충전기용량</label>
                <input 
                  type="text" 
                  id="watt" 
                  class="form-control"
                  v-model="selectedWatt"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="chargerType">충전기설치유형</label>
                <input 
                  type="text" 
                  id="chargerType" 
                  class="form-control"
                  v-model="selectedChargerType"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" key="" for="result">상태미확인결과</label>
                <input 
                  type="text" 
                  id="result" 
                  class="form-control"
                  v-model="selectedResult"
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
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';

export default {
  data(){
    return{
      excelData:[]
    }
  },
  methods: {
    findAddress() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          console.log("받은 주소 : ", data)
          this.selectedAddr = data.address;
          this.selectedSido = data.sido;
          this.selectedSigungu = data.sigungu;
        }
      }).open()
    },
    makeExcelFile (){
      for(var i=0; i<this.tableData.length;i++){
        this.excelData.push({
            idx: this.tableData[i].idx,
            company_idx: this.tableData[i].company_idx,
            manager_idx: this.tableData[i].manager_idx,
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
    const coordinate = {
      lat: 33.450701,
      lng: 126.570667
    };
    const search = ref("");
    const tableData = ref([]); // 테이블 데이터를 저장할 ref
    const tableDataCompany = ref([]); // 테이블 데이터를 저장할 ref
    const tableDataManager = ref([]); // 테이블 데이터를 저장할 ref
    const getChargerStationList = process.env.VUE_APP_API_BASE_URL + "/api/chargerStation/list";
    const getCompanyList = process.env.VUE_APP_API_BASE_URL + "/api/company/list";
    const getManagerList = process.env.VUE_APP_API_BASE_URL + "/api/manager/list";
    const insertChargerStation = process.env.VUE_APP_API_BASE_URL + "/api/chargerStation/insert";
    const updateChargerStation = process.env.VUE_APP_API_BASE_URL + "/api/chargerStation/update";
    const deleteChargerStation = process.env.VUE_APP_API_BASE_URL + "/api/chargerStation/delete/";

    const selectedIdx = ref(); // 선택된 행 데이터
    const selectedCompanyIdx = ref(); // 선택된 행 데이터
    const selectedManagerIdx = ref(); // 선택된 행 데이터
    const selectedName = ref(); // 선택된 행 데이터
    const selectedStationId = ref(); // 선택된 행 데이터
    const selectedChargerCompany = ref();
    const selectedAddr = ref(); // 선택된 행 데이터
    const selectedDetailAddr = ref(); // 선택된 행 데이터
    const selectedSido = ref(); // 선택된 행 데이터
    const selectedSigungu = ref(); // 선택된 행 데이터
    const selectedLatitude = ref(); // 선택된 행 데이터
    const selectedLongitude = ref(); // 선택된 행 데이터
    const selectedVolt = ref(); // 선택된 행 데이터
    const selectedWatt = ref(); // 선택된 행 데이터
    const selectedChargerType = ref(); // 선택된 행 데이터
    const selectedResult = ref(); // 선택된 행 데이터
    const selectedCreateDt = ref(); // 선택된 행 데이터
    const selectedModifyDt = ref(); // 선택된 행 데이터
    const myModal = ref(null);
    const myModal2 = ref(null);


    const openModal = (row) => {
      selectedIdx.value = row.idx; // 선택한 행 데이터 복사
      selectedCompanyIdx.value = row.company_idx; // 선택한 행 데이터 복사
      selectedManagerIdx.value = row.manager_idx; // 선택한 행 데이터 복사
      selectedName.value = row.name; // 선택한 행 데이터 복사
      selectedStationId.value = row.station_id; // 선택한 행 데이터 복사
      selectedChargerCompany.value = row.chargerCompany
      selectedAddr.value = row.addr; // 선택한 행 데이터 복사
      selectedDetailAddr.value = row.detail_addr; // 선택한 행 데이터 복사
      selectedLatitude.value = row.latitude; // 선택한 행 데이터 복사
      selectedLongitude.value = row.longitude; // 선택한 행 데이터 복사
      selectedVolt.value = row.volt; // 선택한 행 데이터 복사
      selectedWatt.value = row.watt; // 선택한 행 데이터 복사
      selectedChargerType.value = row.chargerType; // 선택한 행 데이터 복사
      selectedResult.value = row.result; // 선택한 행 데이터 복사
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
        reqUrl = updateChargerStation;
      else
        reqUrl = insertChargerStation;
        
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
            station_id: selectedStationId.value,
            chargerCompany: selectedChargerCompany.value,
            name: selectedName.value,
            addr: selectedAddr.value,
            detail_addr: selectedDetailAddr.value,
            sido: selectedSido.value,
            sigungu: selectedSigungu.value,
            latitude: selectedLatitude.value,
            longitude: selectedLongitude.value,
            volt: selectedVolt.value,
            watt: selectedWatt.value,
            chargerType: selectedChargerType.value,
            result: selectedResult.value,
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
      axios.post(deleteChargerStation+selectedIdx.value, options)
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
      selectedName,
      selectedStationId,
      selectedChargerCompany,
      selectedAddr,
      selectedDetailAddr,
      selectedSido,
      selectedSigungu,
      selectedLatitude,
      selectedLongitude,
      selectedVolt,
      selectedWatt,
      selectedChargerType,
      selectedResult,
      selectedCreateDt,
      selectedModifyDt,
      myModal,
      myModal2,
      search,
      handleSubmit,
      KakaoMap, KakaoMapMarker,
      coordinate
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
  top:-100px;
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
