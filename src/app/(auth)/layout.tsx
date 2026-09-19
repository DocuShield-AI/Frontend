export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="auth-page-bg flex min-h-screen w-full items-center justify-center p-4 md:p-6 lg:p-8">
      {children}
    </div>
  );
}
