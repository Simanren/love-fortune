export default function CancelPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900/40 to-black">
      <div className="mystic-card p-8 text-center">
        <h1 className="text-3xl font-bold text-red-400 mb-4">支付已取消</h1>
        <p className="text-lg text-purple-100 mb-4">您可以返回重新尝试支付。</p>
        <a href="/result" className="mystic-button px-6 py-2">返回结果页</a>
      </div>
    </main>
  );
} 