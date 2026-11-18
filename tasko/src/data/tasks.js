/**
 * Tasko 초기 샘플 할 일 데이터 (총 8개)
 * 나중에 Supabase로 마이그레이션 예정이며, 현재는 모든 화면이 이 배열을 공유합니다.
 * 
 * 1. 택배 반품 신청 / #생활 / 높음 / 미완료 / 어제(기한 지남)
 * 2. 저녁 운동 30분 / #건강 / 높음 / 미완료 / 오늘 19:00, 중요 표시
 * 3. 영어 단어 20개 외우기 / #공부 / 중간 / 미완료 / 내일
 * 4. 책 30쪽 읽기 / #공부 / 낮음 / 미완료 / 금요일
 * 5. 장보기 / #생활 / 중간 / 완료
 * 6. 병원 예약하기 / #건강 / 낮음 / 완료
 * 7. 방 청소하기 / #생활 / 낮음 / 완료
 * 8. 물 2L 마시기 / #건강 / 낮음 / 완료
 */

export const initialTasks = [
  {
    id: 1,
    title: '택배 반품 신청',
    tag: '#생활',
    priority: 'high', // 'high' | 'medium' | 'low'
    completed: false,
    starred: false,
    dueDate: '어제(기한 지남)',
    isOverdue: true,
    createdAt: '2026.11.10'
  },
  {
    id: 2,
    title: '저녁 운동 30분',
    tag: '#건강',
    priority: 'high',
    completed: false,
    starred: true, // 중요 표시
    dueDate: '오늘 19:00',
    isOverdue: false,
    createdAt: '2026.11.10'
  },
  {
    id: 3,
    title: '영어 단어 20개 외우기',
    tag: '#공부',
    priority: 'medium',
    completed: false,
    starred: false,
    dueDate: '내일',
    isOverdue: false,
    createdAt: '2026.11.11'
  },
  {
    id: 4,
    title: '책 30쪽 읽기',
    tag: '#공부',
    priority: 'low',
    completed: false,
    starred: false,
    dueDate: '금요일',
    isOverdue: false,
    createdAt: '2026.11.11'
  },
  {
    id: 5,
    title: '장보기',
    tag: '#생활',
    priority: 'medium',
    completed: true,
    starred: false,
    dueDate: '완료됨',
    isOverdue: false,
    createdAt: '2026.11.09'
  },
  {
    id: 6,
    title: '병원 예약하기',
    tag: '#건강',
    priority: 'low',
    completed: true,
    starred: false,
    dueDate: '완료됨 (어제)',
    isOverdue: false,
    createdAt: '2026.11.09'
  },
  {
    id: 7,
    title: '방 청소하기',
    tag: '#생활',
    priority: 'low',
    completed: true,
    starred: false,
    dueDate: '완료됨',
    isOverdue: false,
    createdAt: '2026.11.08'
  },
  {
    id: 8,
    title: '물 2L 마시기',
    tag: '#건강',
    priority: 'low',
    completed: true,
    starred: false,
    dueDate: '완료됨 (오늘)',
    isOverdue: false,
    createdAt: '2026.11.12'
  }
];

export default initialTasks;
