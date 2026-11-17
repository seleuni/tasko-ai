import { createClient } from '@supabase/supabase-js';

// .env.local 에 넣어 둔 Supabase 주소와 공개(publishable) 키를 읽습니다.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// 값이 비어 있으면 콘솔에 알려 줍니다.
if (!supabaseUrl || !supabaseKey) {
  console.error(
    'Supabase 환경변수가 비어 있습니다. .env.local 에 VITE_SUPABASE_URL 과 VITE_SUPABASE_PUBLISHABLE_KEY 를 넣어 주세요.'
  );
}

// 앱 전체에서 하나만 만들어 같이 쓰는 Supabase 연결입니다.
// 값이 없어도 앱이 바로 죽지 않도록 빈 문자열 대신 임시 주소를 넣어 둡니다.
export const supabase = createClient(
  supabaseUrl || 'http://localhost',
  supabaseKey || 'missing-key'
);
