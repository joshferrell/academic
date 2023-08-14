import dynamic from "next/dynamic";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { LucidIconType } from "~/actions/types";

interface IconProps extends LucideProps {
  name: LucidIconType;
}

const Icon = ({ name = "alert-triangle", ...props }: IconProps) => {
  const LucideIcon = dynamicIconImports[name]
    ? dynamic(dynamicIconImports[name])
    : dynamic(dynamicIconImports["alert-triangle"]);

  return <LucideIcon {...props} />;
};

export default Icon;
