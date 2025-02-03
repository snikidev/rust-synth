import UserInput from "./components/UserInput";
import CSVUpload from "./components/CSVUpload";
import { HeroUIProvider } from "@heroui/react";

export default function App() {
  return (
    <HeroUIProvider>
      <div className="flex items-center justify-center min-h-dvh flex-col space-y-8">
        <UserInput />
        <hr className="border-2 border-dashed border-black-100 w-1/3" />
        <CSVUpload />
      </div>
    </HeroUIProvider>
  );
}
