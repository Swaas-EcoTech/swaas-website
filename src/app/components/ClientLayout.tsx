"use client";
import ClickSpark from "./ClickSpark";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <ClickSpark
      sparkColor='#3b5837'
      sparkSize={10}
      sparkRadius={45}
      sparkCount={8}
      duration={400}
    >
      {children}
    </ClickSpark>
  );
};

export default ClientLayout;