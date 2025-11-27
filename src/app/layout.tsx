// Root layout - middleware will handle locale routing to [locale] layout
// The [locale]/layout.tsx will provide the html/body structure
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}

