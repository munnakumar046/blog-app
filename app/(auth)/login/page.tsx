import LoginForm from "@/components/LoginForm";
import Link from "next/link";

function LoginPage() {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Login form</h1>
      <LoginForm />
      <p className="mt-4 text-center">
        Don't have account ?
        <Link href="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
