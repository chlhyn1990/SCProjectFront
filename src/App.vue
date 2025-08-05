<template>
  <div id="app">
    <!-- 네비게이션test -->
    <nav class="navbar" v-if="id != null">
      <!-- 토글 버튼 -->
      <button class="menu-toggle" @click="toggleMenu">
        <span v-if="!menuOpen">☰</span>
        <span v-else>✖</span>
      </button>
      <span class="name" v-if="id != null">{{user_name}} 님</span>
      <!-- 네비게이션 메뉴 -->
      <ul :class="['nav-list', { 'nav-open': menuOpen }]" v-show="id === 'test' || id === 'kstzz1004'">
        <li>
            <router-link to="/AdminMainForm" @click="closeMenu">관리자메인</router-link>
        </li>
        <li>
            <router-link to="/CompanyForm" @click="closeMenu">회사관리</router-link>
        </li>
        <li>
            <router-link to="/CompanyGradeForm" @click="closeMenu">회사등급관리</router-link>
        </li>
        <li>
            <router-link to="/ManagerForm" @click="closeMenu">매니저관리</router-link>
        </li>
        <li>
            <router-link to="/ManagerGradeForm" @click="closeMenu">매니저등급관리</router-link>
        </li>
        <li>
            <router-link to="/ChargerForm" @click="closeMenu">충전소관리</router-link>
        </li>
        <li>
            <router-link to="/ChargerModelForm" @click="closeMenu">충전기관리</router-link>
        </li>
        <li>
            <router-link to="/ChecklistForm" @click="closeMenu">체크리스트관리</router-link>
        </li>
        <li>
            <router-link to="/" class="login-btn" @click="closeMenuLogin" v-if="id == null">로그인</router-link>
            <router-link to="/" class="login-btn" @click="closeMenuLogout" v-if="id != null">로그아웃</router-link>
        </li>
      </ul>

      <ul :class="['nav-list', { 'nav-open': menuOpen }]" v-show="id != 'test' && id != null">
        <li>
            <router-link to="/UserMainForm" @click="closeMenu">매니저메인</router-link>
        </li>
        <li>
            <router-link to="/" class="login-btn" @click="closeMenuLogin" v-if="id == null">로그인</router-link>
            <router-link to="/" class="login-btn" @click="closeMenuLogout" v-if="id != null">로그아웃</router-link>
        </li>
      </ul>
    </nav>

    <!-- 배경 오버레이 -->
    <div v-if="menuOpen" class="overlay" @click="closeMenu"></div>

    <!-- 메인 콘텐츠 -->
    <main>
      <router-view @login-success="handleLogin"></router-view>
    </main>

    <!-- 푸터 -->
    <AppFooter />
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from 'vue-router';
import AppFooter from "./components/AppFooter.vue";

export default {
  name: "App",
  components: {
    AppFooter, // 푸터 컴포넌트 등록
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const id = ref(null); // 반응형 변수로 id 선언
    const user_name = ref(null); // 반응형 변수로 id 선언

    // 라우트 변경 감시
    watch(
      () => route.path,
      () => {
        checkAuth();
      }
    );

    // 컴포넌트가 마운트될 때 id 초기화
    onMounted(() => {
      checkAuth();
    });

    const checkAuth = () => {
      updateId();
      if(id.value == null && route.path !== '/') {
        router.push("/");
      }
    };

    // 로그인 상태를 확인하고 id를 업데이트
    const updateId = () => {
      id.value = localStorage.getItem("id");
      user_name.value = localStorage.getItem("user_name");
    };

    const handleLogin = (userId, userNm) => {
      id.value = userId; // 로그인 성공한 ID 저장
      user_name.value = userNm; // 로그인 성공한 ID 저장
      localStorage.setItem("id", userId); // optional: localStorage에 저장
      localStorage.setItem("user_name", userNm); // optional: localStorage에 저장
    };

    // 메뉴 열기/닫기 상태
    const menuOpen = ref(false);

    // 메뉴 토글
    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };

    // 메뉴 닫기
    const closeMenu = () => {
      
      menuOpen.value = false; // 메뉴 닫기
    };

    // 메뉴 닫기
    const closeMenuLogin = () => {
      menuOpen.value = false;
    };

    // 로그아웃 처리 test
    const closeMenuLogout = () => {
      menuOpen.value = false; // 메뉴 닫기
      localStorage.removeItem("id"); // ID 제거
      localStorage.removeItem("user_name"); // 사용자 이름 제거
      updateId(); // id 상태 업데이트
      alert("로그아웃되었습니다");
    };

    return {
      id,
      user_name,
      menuOpen,
      toggleMenu,
      handleLogin,
      closeMenu,
      closeMenuLogout,
      closeMenuLogin,
    };
  },
};
</script>


<style>
.name{
  margin-right:40px;
}
.nav-tabs{
    border:0;
    margin-top:20px;
    margin-bottom:20px;
}
.nav-tabs .nav-link{
  border:0;
  color:#333;
}
.nav-tabs .nav-link.active{
  border-bottom: 2px solid #333;
}
h4{
  margin-top:20px;
}
/* 전체 스타일 초기화 */
body, html {
  margin: 0;
  padding: 0;
  box-sizing: border-box; /* 패딩 포함한 크기 계산 */
  overflow-x: hidden; /* 가로 스크롤 제거 */
  overscroll-behavior: none;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 화면 전체 높이 */
}

main {
  flex: 1; /* 메인 콘텐츠 영역을 확장하여 푸터를 아래로 밀기 */
  padding:10px;
}

/* 네비게이션 스타일 */
.navbar {
  background-color: #333;
  color: white;
  margin: 0; /* 모든 외부 여백 제거 */
  padding: 0; /* 모든 내부 여백 제거 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; /* 화면 너비를 정확히 채움 */
  height: 60px; /* 고정된 높이 */
  box-sizing: border-box; /* 패딩 포함 크기 계산 */
}

.menu-toggle {
  display: none;
  background: none;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  width:50px;
  }

.nav-list {
  list-style: none;
  display: flex;
  gap: 20px; /* 항목 간 간격 */
  margin: 0;
  padding: 0;
  transition: transform 0.3s ease-in-out;
}
/* PC 화면 (768px 이상)에서만 중앙 정렬 */
@media (min-width: 768px) {
  .nav-list {
    justify-content: center; /* 가로 중앙 정렬 */
    margin: 0 auto; /* 가로 중앙 배치 */
  }
}
/* 모바일 스타일 */
@media (max-width: 768px) {
  .menu-toggle {
    display: block; /* 모바일에서 토글 버튼 표시 */
  }

  .nav-list {
    position: fixed;
    top: 0;
    left: 0;
    width: 50%; /* 메뉴 너비 */
    height: 100%;
    background-color: #333;
    flex-direction: column;
    align-items: flex-start; /* 왼쪽 정렬 */
    padding: 20px; /* 메뉴 내부 여백 */
    transform: translateX(-100%); /* 기본적으로 숨김 */
    z-index: 1000; /* 배경 위에 표시 */
  }

  .nav-list.nav-open {
    transform: translateX(0); /* 펼쳐졌을 때 */
  }

  .nav-list li {
    width: 100%; /* 리스트 항목 가로 길이 채우기 */
  }

  .nav-list li a {
    display: block; /* 블록 요소로 변경 */
    width: 100%; /* 링크의 가로 길이를 100%로 설정 */
    padding: 15px 10px; /* 내부 여백 추가 */
    text-align: left; /* 텍스트 왼쪽 정렬 */
    color: white;
    text-decoration: none;
  }

  .nav-list li a:hover {
    background-color: #4caf50; /* 호버 시 배경색 변경 */
    color: white;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
    z-index: 500; /* 메뉴 아래에 위치 */
  }
}

.nav-list li a {
  color: white;
  text-decoration: none;
}

.nav-list li a:hover {
  color: #fff;
}

.login-btn {
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}

.login-btn:hover {
  background-color: #45a049;
}
</style>
