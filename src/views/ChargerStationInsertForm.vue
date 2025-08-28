<template>
  <div>
    <h4 style="margin-bottom:80px;">
      {{selectedName}} 충전소 관리
    </h4>
    <div class="row">
      <div class="col-md-3">
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
      </div>
      <div class="col-md-3">
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
      <div class="col-md-3">
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
      </div>
      <div class="col-md-3">
        <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true">
          <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
        </KakaoMap>
      </div>
      <div class="col-md-12">
        <button type="button" class="btn btn-success"  @click="saveData" data-dismiss="modal">저장</button>
        <button type="button" class="btn btn-dark"  @click="deleteData" data-dismiss="modal">삭제</button>
      </div>

    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router'
import axios from "axios";
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';

export default {

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
  },
  setup() {
    const coordinate = {
      lat: 33.450701,
      lng: 126.570667
    };
    const route = useRoute();
    const tableData = ref([]); // 테이블 데이터를 저장할 ref
    const tableDataCompany = ref([]); // 테이블 데이터를 저장할 ref
    const tableDataManager = ref([]); // 테이블 데이터를 저장할 ref
    const getChargerStation = process.env.VUE_APP_API_BASE_URL + "/api/chargerStation/";
    const getCompanyList = process.env.VUE_APP_API_BASE_URL + "/api/company/list";
    const getManagerList = process.env.VUE_APP_API_BASE_URL + "/api/manager/list";
    const insertChargerStation = process.env.VUE_APP_API_BASE_URL + "/api/chargerStation/insert";
    const updateChargerStation = process.env.VUE_APP_API_BASE_URL + "/api/chargerStation/update";
    const deleteChargerStation = process.env.VUE_APP_API_BASE_URL + "/api/chargerStation/delete/";

    const selectedIdx = ref(route.params.idx);
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

    const fetchData = () => {
      axios.post(getChargerStation + selectedIdx.value)
      .then(response=>{ 
        tableData.value = response.data; // 서버에서 받아온 데이터를 테이블에 반영
        selectedName.value = response.data.name;
        selectedCompanyIdx.value = response.data.company_idx;
        selectedManagerIdx.value = response.data.manager_idx;
        selectedChargerCompany.value = response.data.chargerCompany;
        selectedStationId.value = response.data.station_id;
        selectedVolt.value = response.data.volt;
        selectedWatt.value = response.data.watt;
        selectedChargerType.value = response.data.chargerType;
        selectedResult.value = response.data.result;
        selectedAddr.value = response.data.addr;
        selectedDetailAddr.value = response.data.detail_addr;
        selectedLatitude.value = response.data.latitude;
        selectedLongitude.value = response.data.longitude;
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
      if(route.params.idx != undefined)
        fetchData();
      fetchDataCompany();
      fetchDataManager();
    });
    return {
      coordinate,
      tableData,
      tableDataCompany,
      tableDataManager,
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
      KakaoMap, KakaoMapMarker,
    };
  },
};
</script>

<style>
.btn{
  margin-left:10px;
}
select{
    width: 240px;
    font-size: 18px;
    height: 38px;
    text-align: center;
}
</style>