'use client'

import { Checkbox } from "@/components/ui/checkbox";
import MultiStepForm from "../_components/muiltStepForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { getWeekDays } from "@/utils/get-week-days";

const timeIntervalsFormSchema = z.object({});

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      intervals: [
        { weekDay: 0, enable: false, startTime: "08:00", endTime: "18:00" },
        { weekDay: 1, enable: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 2, enable: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 3, enable: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 4, enable: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 5, enable: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 6, enable: false, startTime: "08:00", endTime: "18:00" },
      ],
    },
  });

  const weekDays = getWeekDays()

  const { fields } = useFieldArray({
    control,
    name: "intervals",
  });

  async function handleSetTimeIntervals() {}
  return (
    <div className="max-w-[35.75rem] mt-6 mx-auto mb-1 px-4">
      <div className="px-6">
        <h1 className="leading-relaxed font-bold text-2xl">Quase lá</h1>
        <p className="text-gray200 mb-6 text-base">
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </p>
        <MultiStepForm step={3} />
      </div>
      <form
        onSubmit={handleSubmit(handleSetTimeIntervals)}
        className="flex flex-col mt-6 bg-gray800 rounded-md p-4 border border-gray-700"
      >
        <div className="border border-gray-700 rounded-md mb-4">
          {fields.map((field) => {
            return (
              <div key={field.id} className="flex items-center justify-between py-4 px-3 border-t border-t-gray-700 first:border-0">
                <div className="flex items-center gap-3">
                  <Checkbox
                    className="w-5 h-5 
                  data-[state=checked]:bg-ignite500
                  data-[state=checked]:text-white
                  "
                  />
                  <p className="text-gray100 text-sm">{weekDays[field.weekDay]}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Input type="time" step={60} />
                  <Input type="time" step={60} />
                </div>
              </div>
            );
          })}
        </div>
        <Button
          className="bg-green-800 text-white hover:bg-green-500"
          type="submit"
        >
          Próximo passo
          <ArrowRight />
        </Button>
      </form>
    </div>
  );
}
