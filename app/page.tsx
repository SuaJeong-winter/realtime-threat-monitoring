import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const {data:logs,error} = await supabase.from('security_logs').select('*')

  if(error){
    console.error("Error fetching logs:", error.message);
  }else{
    console.log("호출된 데이터 건수:", logs?.length);
    console.log("첫 번째 데이터 샘플: ",logs?.[0]);
  }

  return (
    <main style={{padding:'2rem'}}>
      <h1>보안 관제 대시보드 테스트</h1>
      {error && <p style={{color:'red'}}>에러 발생:{error.message}</p>}

      <h3>데이터 원본 확인(JSON)</h3>
      <pre style={{backgroundColor:'#f4f4f4',padding:'15px'}}>
        {logs? JSON.stringify(logs, null, 2) : "데이터가 없습니다."}
      </pre>
    </main>
  );
}
