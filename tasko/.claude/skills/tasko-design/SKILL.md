---
name: tasko-design
description: Tasko 화면을 만들거나 고칠 때 쓴다. 색·글꼴·간격·모서리 규칙과 다크 모드 색을 담고 있다.
---

# Tasko 디자인 규칙

## 색 (라이트 모드)
- Primary #1EA65C, Primary-Light #E8F7EE
- Background #F8F9FA, Surface(카드) #FFFFFF, Border #E9ECEF
- Text-Primary #212529, Text-Secondary #495057, Text-Muted #868E96
- Destructive(삭제·기한 지남) #FA5252

## 색 (다크 모드)
- Primary는 같은 #1EA65C를 쓴다. Primary-Light는 #1B3A2A
- Background #121417, Surface(카드) #1E2125, Border #2C3036
- Text-Primary #F1F3F5, Text-Secondary #ADB5BD, Text-Muted #868E96
- Destructive #FF6B6B

## 모양
- 카드 모서리는 rounded-2xl, 버튼과 칩은 rounded-full
- 카드 안쪽 여백은 p-4, 카드 사이 간격은 gap-3
- 글꼴 크기: 화면 제목 text-xl font-bold, 카드 제목 text-base font-semibold, 보조 글자 text-xs

## 만들 때 지킬 것
- 새 색을 만들지 않는다. 위 표의 색만 쓴다.
- 다크 모드는 Tailwind의 dark: 접두사로 만든다.
- 지금 화면의 배치와 크기는 바꾸지 않는다.
