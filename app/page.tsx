import { createClient } from "@/utils/supabase/server";
import { log } from "console";

export default async function Home() {
  const supabase = await createClient();

  const { data: logs, error } = await supabase.from('security_logs').select('*').order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching logs:", error.message);
  } else {
    console.log("호출된 데이터 건수:", logs?.length);
    console.log("첫 번째 데이터 샘플: ", logs?.[0]);
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Critial': return 'bg-red-100 text-red-700 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    };
  }



  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 flex justify-between items-center items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">⚠️ 실시간 위협 모니터링 서비스</h1>
            <p className="text-gray-500 mt-2">보안 위협을 실시간으로 모니터링합니다.</p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">🦉System Live</span>
          </div>
        </header>

        <div className="grid gap-4">
          {logs?.map((log) => (
            <div key={log.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-md text-xs font-bold border ${getLevelColor(log.threat_level)}`}>
                    {log.threat_level.toUpperCase()}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-800">{log.threat_type}</h3>
                </div>
                <span className="text-sm text-gray-400">{new Date(log.created_at).toLocaleString()}</span>
              </div>

              <p className="text-gray-600 mb-4">{log.description}</p>

              <div className="flex items-cneter gap-6 text-sm text-gray-500 border-t pt-4">
                <div className="flex items-center gap-1">
                  <span className="font-semibold">IP:</span>{log.location}
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">Status:</span>
                  <span className="capitalize">{log.status}</span>
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    </div>
  );
}
