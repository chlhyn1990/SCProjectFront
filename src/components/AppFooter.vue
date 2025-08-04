<template>
  <footer class="footer">
    <p>COPYRIGHT @SCProject All Rights Reserved.</p>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style scoped>
/* 푸터 스타일 */
.footer {
  background-color: #333;
  color: white;
  text-align: center;
  margin: 0; /* 외부 여백 제거 */
  padding: 5px; /* 내부 여백 제거 */
  width: 100vw; /* 화면 너비를 완전히 채움 */
  height: 60px; /* 고정된 높이 */
  box-sizing: border-box; /* 패딩 포함 크기 계산 */
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: center; /* 텍스트 중앙 정렬 */
}
</style>
