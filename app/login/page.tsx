import LoginForm from "../ui/login-form";

 export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-6 shadow-md">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Playwright Article</h1>
      </div>
      <LoginForm />
    </main>
  );
}