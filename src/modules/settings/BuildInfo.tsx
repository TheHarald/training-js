import { info } from "./settings";

export const BuildInfo = () => {
  return (
    <div className="flex flex-col gap-2">
      <div>{info.buildDate}</div>
      <div>{info.buildVersion}</div>
    </div>
  );
};
