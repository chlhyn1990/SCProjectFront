<template>
  <div>
    <h4>
      <img class="image" src="../images/circle.png" alt="이미지">
      에너지 수요관리 시스템</h4>
    <div>
      <p class="bold">이번달 전력 사용량 <router-link to="/" class="sublink1">자세히 >></router-link></p>
      <div class="form-group">
        <div class="input-group">
          <label class="labelHome" for="ami_meter">HOME</label>
          <input class="form-control" type="text" id="ami_meter" v-model="ami_meter" value="1234kWh" readonly/>
          <div class="input-group-append">
            <span class="input-group-text">kWh</span>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <label class="labelEv" for="ev_meter">EV</label>
          <input class="form-control" type="text" id="ev_meter" v-model="ev_meter"  value="1234kWh" readonly/>
          <div class="input-group-append">
            <span class="input-group-text">kWh</span>
          </div>
        </div>
      </div>
      <p class="small">* {{today}} 기준</p> 
    </div>
    <div>
      <p class="bold">오늘 최대 사용 전력 <router-link to="/" class="sublink1">자세히 >></router-link></p>
      <div class="form-group">
        <div class="input-group">
          <label class="labelHome" for="max_power_ami">HOME</label>
          <input class="form-control" type="text" id="max_power_ami" v-model="max_power_ami" value="1234kWh" readonly/>
          <div class="input-group-append">
            <span class="input-group-text">kW</span>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <label class="labelEv" for="max_power_ev">EV</label>
          <input class="form-control" type="text" id="max_power_ev" v-model="max_power_ev"  value="1234kWh" readonly/>
          <div class="input-group-append">
            <span class="input-group-text">kW</span>
          </div>
        </div>
      </div>
    </div>
    <p class="small">* {{today}} 기준</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from "axios";

export default {
  setup() {
    const ami_meter = ref();
    const ev_meter = ref();
    const max_power_ami = ref();
    const max_power_ev = ref();
    const today = ref();
    const initValue = () => {
      console.log(localStorage.getItem('id'));
      axios.post("http://localhost/api/", {
          id: localStorage.getItem('id'),
      })
      .then(response=>{ 
        console.log(response);
        console.log(response.data);
        ami_meter.value = response.data.ami_meter;
        ev_meter.value = response.data.ev_meter;
        max_power_ami.value = response.data.max_power_ami;
        max_power_ev.value = response.data.max_power_ev;
        today.value = response.data.today;
      })
      .catch(response=>{
        console.log("잘못된 요청입니다 ", response);
        
      });
      
    };
    onMounted( async()=>{
      initValue();
    });

    return {
      ami_meter,
      ev_meter,
      max_power_ami,
      max_power_ev,
      today,
    };
  }
}
  
</script>

<style>
.labelHome{
    vertical-align: middle !important;
    padding-right: 28px;
    padding-left: 10px;
    text-align: center;
}
.labelEv{
    vertical-align: middle !important;
    padding-right: 54px;
    padding-left: 10px;
    text-align: center;
}
.image {
  width:60px;
  vertical-align:middle;
}

.sublink1{
  padding-left:100px;
  text-decoration-line: underline;
  font-weight: normal;
  font-size: 10pt;
  color: black;
}
.small{
  font-size: 10pt;
}
.bold{
  font-weight: bold;
  margin-top:40px;
}
</style>