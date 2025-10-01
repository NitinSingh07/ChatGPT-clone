import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#212121]">
      <div className="w-full max-w-md space-y-6 px-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-white">Welcome Back</h1>
          <p className="text-sm text-gray-400">
            Sign in to continue your conversations
          </p>
        </div>
        <SignIn
          appearance={{
            baseTheme: undefined,
            variables: {
              colorPrimary: "#10a37f",
              colorBackground: "#2f2f2f",
              colorInputBackground: "#40414f",
              colorInputText: "#ffffff",
              colorText: "#ffffff",
              colorTextSecondary: "#9ca3af",
              colorDanger: "#ef4444",
              borderRadius: "0.5rem",
            },
            elements: {
              rootBox: "mx-auto",
              card: "bg-[#2f2f2f] shadow-2xl border border-gray-700",
              headerTitle: "text-white text-xl font-semibold",
              headerSubtitle: "text-gray-400 text-sm",
              socialButtonsBlockButton:
                "bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 font-normal",
              socialButtonsBlockButtonText: "text-gray-700 font-normal text-sm",
              formButtonPrimary:
                "bg-[#10a37f] hover:bg-[#0d8f6b] text-white text-sm font-medium normal-case shadow-none",
              formFieldInput:
                "bg-[#40414f] border-gray-600 text-white placeholder:text-gray-500 focus:border-[#10a37f] focus:ring-[#10a37f]",
              formFieldLabel: "text-gray-300 text-sm font-medium",
              footerActionLink:
                "text-[#10a37f] hover:text-[#0d8f6b] font-medium",
              identityPreviewText: "text-white",
              identityPreviewEditButton: "text-[#10a37f] hover:text-[#0d8f6b]",
              formFieldInputShowPasswordButton:
                "text-gray-400 hover:text-white",
              otpCodeFieldInput:
                "bg-[#40414f] border-gray-600 text-white focus:border-[#10a37f]",
              formResendCodeLink: "text-[#10a37f] hover:text-[#0d8f6b]",
              dividerLine: "bg-gray-700",
              dividerText: "text-gray-400 text-sm",
              footerActionText: "text-gray-400",
            },
          }}
        />
      </div>
    </div>
  );
}
