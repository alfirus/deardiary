import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
			<div className="flex min-h-screen flex-col items-center justify-center p-24">
				<div className="w-full max-w-md space-y-8">
					<div className="text-center">
						<h1 className="font-bold">Login</h1>
						<p className="text-muted-foreground">Welcome back!</p>
					</div>
					<LoginForm />
				</div>
			</div>
		);
}
