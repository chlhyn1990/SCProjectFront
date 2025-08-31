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
    <h4 style="margin-top:80px;margin-bottom:40px;">
      분전함 관리
    </h4>

    <div class="row" style="margin-bottom:40px;">
      <div class="col-md-12">
        <a class="btn btn-primary add-btn" @click="addDistribution">분전함추가</a>
      </div>
    </div>

    <div class="distributionBox">
      <div :class="'distribution' + index"  v-for="(distribution, index) in tableDataDistribution" :key="index">
        <div class="row">
          <div class="col-md-3">
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" :for="'dist_id_' + index">분전함ID</label>
                <input 
                  type="text" 
                  :id="'dist_id_' + index" 
                  class="form-control"
                  v-model="distribution.id"
                />
              </div>
            </div>  
          </div>  
          <div class="col-md-3">
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" :for="'dist_name_' + index">분전함명</label>
                <input 
                  type="text" 
                  :id="'dist_name_' + index" 
                  class="form-control"
                  v-model="distribution.name"
                />
              </div>
            </div>       
          </div>       
          <div class="col-md-3">
            <div class="form-group">
              <div class="input-group">
                <label class="labelModal" :for="'dist_detail_place_' + index">상세장소</label>
                <input 
                  type="text" 
                  :id="'dist_detail_place_' + index" 
                  class="form-control"
                  v-model="distribution.detail_place"
                />
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <a class="btn btn-success remove-btn" @click="saveDistribution(index)">저장</a>
            <a class="btn btn-secondary remove-btn" @click="removeDistribution(index)">삭제</a>
          </div>
        </div> 
      </div>
    </div>
    
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router'
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
    addDistribution(){
      console.log('addDistribution');
      if(!this.selectedIdx){
        alert('충전소 저장 후 추가할 수 있습니다.');
        return;
      }
      this.tableDataDistribution.push({
        id: '',
        name: '',
        detail_place: ''
      });
    },
    removeDistribution(index) {
      console.log('removeDistribution');
      this.deleteDataDistribution(index);
    }
  },
  setup() {
    const coordinate = {
      lat: 33.450701,
      lng: 126.570667
    };
    const route = useRoute();
    const router = useRouter();
    const tableData = ref([]); // 테이블 데이터를 저장할 ref
    const tableDataCompany = ref([]); // 테이블 데이터를 저장할 ref
    const tableDataManager = ref([]); // 테이블 데이터를 저장할 ref
    const tableDataDistribution = ref([]);
    const getChargerStation = process.env.VUE_APP_API_BASE_URL + "/api/chargerStation/";
    const getCompanyList = process.env.VUE_APP_API_BASE_URL + "/api/company/list";
    const getManagerList = process.env.VUE_APP_API_BASE_URL + "/api/manager/list";
    const insertChargerStation = process.env.VUE_APP_API_BASE_URL + "/api/chargerStation/insert";
    const updateChargerStation = process.env.VUE_APP_API_BASE_URL + "/api/chargerStation/update";
    const deleteChargerStation = process.env.VUE_APP_API_BASE_URL + "/api/chargerStation/delete/";

    const getDistribution = process.env.VUE_APP_API_BASE_URL + "/api/distribution/list/";
    const insertDistribution = process.env.VUE_APP_API_BASE_URL + "/api/distribution/insert";
    const updateDistribution = process.env.VUE_APP_API_BASE_URL + "/api/distribution/update";
    const deleteDistribution = process.env.VUE_APP_API_BASE_URL + "/api/distribution/delete/";

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
        fetchDataCompany();
        fetchDataDistribution();
        fetchDataManager();
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

    const fetchDataDistribution = () => {
      axios.post(getDistribution + selectedIdx.value)
      .then(response=>{ 
        tableDataDistribution.value = response.data; // 서버에서 받아온 데이터를 테이블에 반영
        console.log(tableDataDistribution);
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

    const saveDistribution = (index) => {
      const distribution = tableDataDistribution.value[index];
      console.log(distribution);
      
      // 필수 필드 검증
      if (!distribution.id || !distribution.name) {
        alert('분전함 ID와 이름은 필수 입력 항목입니다.');
        return; 
      }
      
      let reqUrl;
      
      // 분전함에 idx가 있으면 업데이트, 없으면 새로 추가
      if (distribution.idx) {
        reqUrl = updateDistribution;
      } else {
        reqUrl = insertDistribution;
      }
      
      const options = {
        headers: {
          'content-type': 'application/json',
          'x-api-key': ''
        }
      };
      
      // 분전함 데이터만 전송
      axios.post(reqUrl, {
        idx: distribution.idx, // 분전함 고유 ID (있으면 업데이트, 없으면 새로 생성)
        charger_station_idx: selectedIdx.value, // 소속 충전소 ID
        id: distribution.id, // 분전함 ID
        name: distribution.name, // 분전함명
        detail_place: distribution.detail_place, // 상세장소
        create_dt: distribution.create_dt,
        modify_dt: new Date().toISOString().split('T')[0] // 현재 시간으로 수정일자 업데이트
      }, options)
      .then(response => { 
        console.log('분전함 저장 성공:', response.data);
        
        // 서버에서 반환된 데이터로 분전함 정보 업데이트
        if (response.data.idx) {
          tableDataDistribution.value[index].idx = response.data.idx;
        }
        alert('분전함이 저장되었습니다');
        fetchDataDistribution();
      })
      .catch(error => {
        console.error("분전함 저장 실패:", error);
        alert('분전함 저장에 실패했습니다');
      });
    };

    const deleteDataDistribution = (index) => {
      console.log('deleteDataDistribution', index);
      
      // 분전함이 서버에 저장된 경우에만 삭제 API 호출
      const distribution = tableDataDistribution.value[index];
      if (distribution.idx != undefined) {
        if (confirm('분전함을 삭제하겠습니까?')) {
          const options = {
            headers: {
              'content-type': 'application/json',
              'x-api-key': ''
            }
          };
          
          axios.post(deleteDistribution + distribution.idx, {}, options)
            .then(response => {
              console.log('분전함 삭제 성공:', response.data);
              tableDataDistribution.value.splice(index, 1);
              alert('분전함이 삭제되었습니다');
              fetchDataDistribution();
            })
            .catch(error => {
              console.error('분전함 삭제 실패:', error);
              alert('분전함 삭제에 실패했습니다');
            });
        }
      } else {
        // 아직 저장되지 않은 분전함은 그냥 제거
        tableDataDistribution.value.splice(index, 1);
      }
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
        if(reqUrl == insertChargerStation){
          selectedIdx.value = response.data;
          router.push("/ChargerStationInsertForm/" + selectedIdx.value);
          fetchData();
        }else{
          fetchData();
        }
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
        router.push("/ChargerStationForm");
      })
      .catch(response=>{
        console.error("데이터 요청 실패:", response.status);
      });
    };

    onMounted(() => {
      if(route.params.idx != undefined){
        fetchData();
      }
      else{
        fetchDataCompany();
        fetchDataManager();
      }
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
      tableDataDistribution,
      saveDistribution,
      deleteDataDistribution,
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