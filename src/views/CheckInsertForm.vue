<template>
  <div>
    <h4 style="margin-bottom:40px;">
      {{selectedName}} 점검표 등록
    </h4>

    <div class="row">
      <div class="col-md-12">
        <h4 style="padding:0px 0px 20px 20px">- 기본정보</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal">점검일자</label>
            <VueDatePicker id="check_dt"  v-model="formData.checkMst.check_dt" format="yyyy-MM-dd"></VueDatePicker>
          </div>
        </div>  
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="temperature">주변 온도/습도</label>
            <input 
              type="text" 
              id="temperature" 
              class="form-control"
              v-model="formData.checkMst.temperature"
              placeholder="0.0 ℃/	0 %RH"
            />
          </div>
        </div>        
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">점검자</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.checkMst.manager_name"
            />
          </div>
        </div>        
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <h4 style="padding:20px">- 적합성</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">개방 여부</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.compatibility.open"
            />
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">쉽게 접근가능</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.compatibility.access"
            />
          </div>
        </div>   
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">이정표  설치  여부</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.compatibility.milestone"
            />
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">(완속,급속) 표시</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.compatibility.rapid"
            />
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">적정공간 확보</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.compatibility.space"
            />
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">무료주차</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.compatibility.free"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <h4 style="padding:20px">- 환경성</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">주위온도  적정성</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.environment.temperature"
            />
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">분진,가스등에  안전</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.environment.gas"
            />
          </div>
        </div>   
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">발열대비  개방성</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.environment.openness"
            />
          </div>
        </div>   
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">미끄럼방지  여부</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.environment.slip"
            />
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">환기  적정성</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.environment.ventilation"
            />
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">눈,비에  안전</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.environment.snowrain"
            />
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">침수방지  등</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.environment.flooding"
            />
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">진동,발열체에  안전</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.environment.vibration"
            />
          </div>
        </div>
      </div>
    </div>


    <div class="row">
      <div class="col-md-12">
        <h4 style="padding:20px">- 편리성</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">홈페이지 (누리집) 연동여부</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.convenience.homepage"
            />
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">충전시설  위치</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.convenience.facility"
            />
          </div>
        </div>   
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">상태정보  확인</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.convenience.status"
            />
          </div>
        </div>   
        
        <div class="form-group">
            <div class="input-group">
              <label class="labelModal" key="" for="manager_name">스토퍼,볼라드  등</label>
              <input 
                type="text" 
                id="manager_name" 
                class="form-control"
                v-model="formData.convenience.stopper"
              />
            </div>
          </div>   

        <div class="form-group">
            <div class="input-group">
              <label class="labelModal" key="" for="manager_name">터치스크린  정상여부</label>
              <input 
                type="text" 
                id="manager_name" 
                class="form-control"
                v-model="formData.convenience.screen"
              />
            </div>
          </div>   
        <div class="form-group">
            <div class="input-group">
              <label class="labelModal" key="" for="manager_name">환경부카드 외 결재방식</label>
              <input 
                type="text" 
                id="manager_name" 
                class="form-control"
                v-model="formData.convenience.payment"
              />
            </div>
          </div>   
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">적정  조명 (기준조도:40lx)</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.convenience.lighting"
              placeholder="0 lx"
            />
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">CCTV (관리원)</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.convenience.cctv"
            />
          </div>
        </div>   
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">비상정지버튼</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.convenience.emergency"
            />
          </div>
        </div>   
      </div>

      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">환경부카드  사용가능</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.convenience.card"
            />
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">차량,보행자 통행안전</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.convenience.traffic"
            />
          </div>
        </div>      
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <h4 style="padding:20px">- 제품안정성</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">발청,누수,녹발생 없음</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.productSafety.rust"
            />
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">볼라드/스토퍼 고정</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.productSafety.stopper"
            />
          </div>
        </div>   
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">커넥터균열,파손없음</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.productSafety.connector"
            />
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">보호잠금장치 정상</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.productSafety.lock"
            />
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">충전기 변색 없음</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.productSafety.discolor"
            />
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">충전기패드 정상고정</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.productSafety.pad"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <h4 style="padding:20px">- 전기안정성</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">시설의 적정성</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.facilities"
            />
          </div>
        </div>   
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">빗물등에 안전</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.rainwater"
            />
          </div>
        </div>   
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">사람 접촉에 안전</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.contact"
            />
          </div>
        </div>   
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">위험표지 여부</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.danger"
            />
          </div>
        </div>   
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">분전함 LOCKING</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.locking"
            />
          </div>
        </div>   
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">분전함 접지선</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.wire"
            />
          </div>
        </div>   
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">계량기 점검 용이</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.meter"
            />
          </div>
        </div>   
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">차단기 정상동작</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.gate"
            />
          </div>
        </div>   
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">접지공사 적정성</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.grounding_work"
              placeholder="측정값"
            />
          </div>
        </div>   
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">접지저항값</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.resistance"
              placeholder="0.0 Ω"
            />
          </div>
        </div>   
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">접지선의 굵기</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.thickness"
              placeholder="0 ㎡"
            />
          </div>
        </div>   
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">분전반, 충전기 외함</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.distribution"
              placeholder="0 ㎟"
            />
          </div>
        </div>   
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">충전기 케이블</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.cable"
              placeholder="0 ㎟"
            />
          </div>
        </div>   
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">배선의 적정성</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.wiring"
            />
          </div>
        </div>  
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">적합한 케이블 사용</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.suitable_cable"
            />
          </div>
        </div>  
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">금속부분은 접지</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.metal_part"
            />
          </div>
        </div>  
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">케이블의 손상 없음</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.cable_damage"
            />
          </div>
        </div>  
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">분전함 결선상태 정상</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.wiring_status"
            />
          </div>
        </div>  
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">절연 저항 측정</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.insulation_resistance"
              placeholder="무한대"
            />
          </div>
        </div>  
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">• 1종충전기 : 1㏁ 이상</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.type_charger1"
            />
          </div>
        </div>  
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">• 2종충전기 : 7㏁ 이상</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.type_charger2"
            />
          </div>
        </div>  
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">차단기 적정성</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.gate_value"
              placeholder="측정값"
            />
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">과전류차단기정격</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.overcurrentW"
              placeholder="0P0W"
            />
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.overcurrentA"
              placeholder="0A"
            />
          </div>
        </div>  
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">누전차단기정격</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.leakageW"
              placeholder="0P0W"
            />
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.leakageA"
              placeholder="0A"
            />
          </div>
        </div>  
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">감도전류/동작시간</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.sensitivity"
              placeholder="0 mA/ 0.00sec"
            />
          </div>
        </div>  
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">전선의 굵기</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.wire_thickness"
              placeholder="0 ㎡"
            />
          </div>
        </div>  
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">케이블 조임상태 정상</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.electricalStability.cable_tightening"
            />
          </div>
        </div>  
      </div>
    </div>

    
    <div class="row">
      <div class="col-md-12">
        <h4 style="padding:20px">- 소방안전성</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">소화설비 비치</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.fireSafety.facility"
            />
          </div>
        </div>
      
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">비상시 신속대피 가능</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.fireSafety.evacuation"
            />
          </div>
        </div>
       
      </div>
      <div class="col-md-4">
        
      </div>
    </div>


    <div class="row">
      <div class="col-md-12">
        <h4 style="padding:20px">- 유지보수</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">고장시 비상연락처</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.maintenance.contact"
            />
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">주위 정리정돈</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.maintenance.organize"
            />
          </div>
        </div>   
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">AS센터 연결가능</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.maintenance.ascenter"
            />
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">불편민원신고센터 연결가능</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.maintenance.complaint"
            />
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">고장시 표시등	</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.maintenance.light"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <h4 style="padding:20px">- 충전작동 (실차)</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">차량 충전 작동</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.chargingOperation.charge"
            />
          </div>
        </div>
      
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">충전 속도 정상</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.chargingOperation.speed"
            />
          </div>
        </div>
       
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">비상정지버튼 작동</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.chargingOperation.button"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <h4 style="padding:20px">- 충전작동 (실차, 데이터연동 확인)</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <label class="labelModal" key="" for="manager_name">데이터 공유 적합성</label>
            <input 
              type="text" 
              id="manager_name" 
              class="form-control"
              v-model="formData.chargingOperation.share"
            />
          </div>
        </div>
      
      </div>
      <div class="col-md-4">

      </div>
      <div class="col-md-4">
        
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <h4 style="padding:20px">- 종합의견</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <textarea
        style="width:50%;margin-left:20px;margin-bottom:20px"
        rows="4"
        class="form-control" 
        v-model="formData.opinion.content"></textarea>
      </div>
    </div>


    <div class="row">
      <button type="button" style="margin-left:30px;" class="btn btn-success"  @click="saveData" data-dismiss="modal">저장</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from "vue";
import { useRoute } from 'vue-router'
import axios from "axios";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  components: { VueDatePicker},
  methods: {

  },
  setup() {

    const route = useRoute();

    const formData = reactive({
      checkMst: {
        // checkMst
      },
      compatibility: {
        // 적합성
      },
      environment: {
        // 환경성
      },
      convenience: {
        // 편리성
      },
      productSafety: {
        // 제품안정성
      },
      electricalStability: {
        // 전기안정성
      },
      fireSafety: {
        // 소방안정성
      },
      maintenance: {
        // 유지보수
      },
      chargingOperation: {
        // 충전작동
      },
      opinion: {
        // 종합의견
      }
    });

    const getCheck = process.env.VUE_APP_API_BASE_URL + "/api/check/";
    const updateCheck = process.env.VUE_APP_API_BASE_URL + "/api/check/update";

    const selectedCheckMstIdx = ref(route.params.idx);

    const fetchData = () => {
      axios.post(getCheck + selectedCheckMstIdx.value)
      .then(response => { 
        // ✅ 서버 데이터를 formData에 병합
        Object.keys(response.data).forEach(key => {
          if (formData[key] !== undefined) {
            Object.assign(formData[key], response.data[key]);
          }
        });
      })
      .catch(error => {
        console.error("데이터 요청 실패:", error);
      });
    };

    const saveData = () => {
      var reqUrl;
      reqUrl = updateCheck;
        
      const options = {
                  headers: {
                          'content-type' : 'application/json',
                          'x-api-key' : ''
                      }
                  }

        const date = new Date(formData.checkMst.check_dt);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const formattedDate = `${year}${month}${day}`;

        if(formattedDate != 'NaNNaNNaN'){
          formData.checkMst.check_dt = formattedDate;
        }

      axios.post(reqUrl, formData, options)
      .then(response=>{ 
        console.log(response.data); // 서버에서 받아온 데이터를 테이블에 반영
        alert('저장 성공');
        fetchData();
      })
      .catch(response=>{
        console.error("데이터 요청 실패:", response.status);
      });
    };

    onMounted(() => {
      if(route.params.idx != undefined){
        fetchData();
      }
    });
    return {
      formData,
      saveData,
      selectedCheckMstIdx,
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
.form-control::placeholder{
  color:red;
}
</style>