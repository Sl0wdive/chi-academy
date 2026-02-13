import ReduxProvider from "@/src/providers/ReduxProvider";
import SocketProvider from "@/src/providers/SocketProvider";
import AuthLoader from "../components/AuthLoader";
import NotificationContainer from "../components/NotificationContainer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body>
        <ReduxProvider>
          <SocketProvider>
            <NotificationContainer />
            <AuthLoader />
            {children}
          </SocketProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
