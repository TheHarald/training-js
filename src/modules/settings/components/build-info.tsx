import { Card, CardBody } from "@heroui/react";
import { info } from "../services/settings";
import dayjs from "dayjs";

export const BuildInfo = () => {
  const date = dayjs(info.buildDate).format("DD.MM.YYYY HH:mm:ss");

  return (
    <Card className="flex flex-col gap-2">
      <CardBody>
        <div>{`Дата сборки: ${date}`}</div>
        <div>{info.buildVersion}</div>
      </CardBody>
    </Card>
  );
};
