import { CheckCircle } from "@phosphor-icons/react";
import { DropdownInputTime } from "./DropdownInputTime";

export function CheckInTime() {
  return (
    <>
      <div className="flex flex-col gap-2 w-full bg-white rounded-md shadow-md p-5 gap-5">
        <h1 className="text-dark-purple text-2xl font-bold">
          Seu horário de chegada
        </h1>
        <hr className="h-px w-full bg-slate-400 border-0" />
        <div className="md:w-[700px]">
          <div className="flex items-center">
            <CheckCircle
              size={24}
              weight="bold"
              color="#383b58"
              className="mr-1"
            />
            <h1 className="text-sm font-bold text-dark-purple">
              Seu quarto estará pronto para check-in entre 10h00 e 23h00
            </h1>
          </div>
          <p className="text-xs font-medium text-dark-purple py-3">
            Indique a sua hora prevista de chegada
          </p>
          <DropdownInputTime />
        </div>
      </div>
    </>
  );
}
