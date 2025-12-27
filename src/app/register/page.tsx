import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
			<div className="flex min-h-screen flex-col items-center justify-center p-24">
				<div className="w-full max-w-md space-y-8">
					<div className="text-center">
						<h1 className="font-bold">Register</h1>
						<p className="text-muted-foreground">Create a new account</p>
					</div>
					<RegisterForm />
				</div>
			</div>
		);
}
