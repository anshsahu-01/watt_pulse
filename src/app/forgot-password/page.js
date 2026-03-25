import Link from "next/link";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import { BrandMark } from "@/components/Header";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-[#f4f6fb] px-6 py-12 lg:px-10 xl:px-14">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-[1340px] items-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(24,39,75,0.12)] xl:grid-cols-[1.08fr_0.92fr]">
          <section className="flex items-center justify-center bg-[#dde4ff] px-10 py-12 text-[#1f2d46] xl:px-16 xl:py-16">
            <div className="scale-125 md:scale-150 xl:scale-[1.7]">
              <BrandMark />
            </div>
          </section>

          <section className="flex items-center justify-center bg-white px-6 py-6 md:px-10 md:py-8 xl:px-12 xl:py-10">
            <div className="w-full max-w-md">
              <h1 className="text-center text-4xl font-semibold tracking-[-0.03em] text-[#1f2d46]">
                Forgot Password
              </h1>
              <p className="mt-3 text-center text-sm text-[#7b86a0]">
                Enter your email to receive an OTP and reset your password.
              </p>

              <div className="mt-8">
                <ForgotPasswordForm />
              </div>

              <div className="mt-8 text-center text-sm text-[#7b86a0]">
                Remembered your password?{" "}
                <Link href="/login" className="font-semibold text-[#4e42d4]">
                  Back to Sign In
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
