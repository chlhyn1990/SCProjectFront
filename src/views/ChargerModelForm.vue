<template>
  <div class="login-container">
    <h4 class="title">
      SCSystem
    </h4>
    <h4 class="login">Log In</h4>
    <form class="form" @submit.prevent="handleLogin">
      <div class="form-group">
        <div class="input-group">
          <label class="labelId" for="id">ID</label>
          <input class="form-control" type="text" id="id" v-model="id" placeholder="" />
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <label class="labelPw" for="password">PW</label>
          <input class="form-control" type="password" id="password" v-model="password" placeholder="" />
        </div>
      </div>
      <button class="loginBtn" type="submit">로그인</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginForm",
  data() {
    return {
      id: "", // 사용자 입력 아이디
      password: "", // 사용자 입력 비밀번호
    };
  },
  methods: {
    async handleLogin() {
      const options = {
                headers: {
                        'content-type' : 'application/json',
                    }
                }
      if (this.id && this.password) {
        console.log(`로그인 시도: ${this.id}`);
      } else {
        alert("아이디와 비밀번호를 입력해주세요.");
        return;
      }
      // API 엔드포인트 URL
      const url = "http://localhost:8080/api/manager/login";

      try {
        // POST 요청으로 로그인 시도
        const response = await axios.post(url, {
          id: this.id,
          password: this.password,
        }, options);

        // 서버로부터 받은 응답 처리
        if (response.status === 200) {
          console.log(response.data); 
          if(response.data){
            this.$emit("login-success", response.data.id, response.data.name);
            if(response.data.id === 'test' || response.data.id === 'kstzz1004'){
              this.$router.push("/AdminMainForm");
            }else{
              this.$router.push("/UserMainForm");
            }
          }else{
            alert("아이디 또는 비밀번호를 확인해주세요.");
          }
        } else {
          alert("로그인에 실패했습니다.");
        }
      } catch (error) {
        console.error("로그인 요청 중 에러 발생:", error);
        alert("로그인 요청 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    },
  },
};
</script>

<style>
.title{
  text-align: center;
  margin-top: 40px;
}
.form{
  margin-top: 40px;
}
.labelId{
    vertical-align: middle !important;
    padding-right: 28px;
    padding-left: 10px;
    text-align: center;
}
.labelPw{
    vertical-align: middle !important;
    padding-right: 20px;
    padding-left: 10px;
    text-align: center;
}
.login{
      text-align: center;
      margin-top:40px;
}
.image-container {
  display: flex; /* Flexbox로 부모 요소 설정 */
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  margin: 0; /* 여백 제거 */
  padding-top: 40px;
}

.image-container img {
  max-width: 100%; /* 이미지가 부모의 너비를 초과하지 않도록 설정 */
  height: auto; /* 이미지 비율 유지 */
}

.login-container {
  max-width: 400px;
  margin: 0px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

@media (max-width: 768px) {
  .login-container {
    border: 0px solid #ccc;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);
  }
}
</style>