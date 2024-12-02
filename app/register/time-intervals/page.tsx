'use client'

import { Checkbox } from "@/components/ui/checkbox";
import MultiStepForm from "../_components/muiltStepForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { getWeekDays } from "@/utils/get-week-days";
import { zodResolver } from "@hookform/resolvers/zod";
import { convetTimeStringToMinutes } from "@/utils/convert-time-string-to-minute";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const timeIntervalsFormSchema = z.object({
  intervals: z.array(z.object({
    weekDay: z.number().min(0).max(6),
    enabled: z.boolean(),
    startTime: z.string(),
    endTime: z.string(),
  }),
).
length(7).
transform(intervals => intervals.filter(interval => interval.enabled))
.refine(intervals => intervals.length > 0, {
  message: 'Você precisa selecionar pelo menos 1 dia na semana!'
})
.transform(intervals => {
  return intervals.map(interval => {
    return {
      weekDay: interval.weekDay,
      startTimeInMinutes: convetTimeStringToMinutes(interval.startTime),
      endTimeInMinutes: convetTimeStringToMinutes(interval.endTime),
    }
  })
})
.refine(intervals => {
  return intervals.every(
    (interval) =>
       interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes)
},{
  message: 'O horário de término deve ser pelo menos 1h de diferença do ínicio.'
})
,
});
type TimeIntervalFormInput = z.input<typeof timeIntervalsFormSchema> //Representa os dados de entrada
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema> //Representa os dados de saida

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<TimeIntervalFormInput>({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: "08:00", endTime: "18:00" },
        { weekDay: 1, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 2, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 3, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 4, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 5, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 6, enabled: false, startTime: "08:00", endTime: "18:00" },
      ],
    },
  });

  const router = useRouter()

  const weekDays = getWeekDays()

  const { fields } = useFieldArray({
    control,
    name: "intervals",
  });

  const intervals = watch('intervals')

  async function handleSetTimeIntervals(data: any) {
    const intervals = data as  TimeIntervalsFormOutput
    try {
      await api.post('/users/time-intervals', {
        intervals,     
      })

      await router.push('/register/update-profile')

    } catch (err) {
      if(err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message)
        return
      }
      console.log(err)
    }
  }

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
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="flex items-center justify-between py-4 px-3 border-t border-t-gray-700 first:border-0">
                <div className="flex items-center gap-3">
                  <Controller
                    name={`intervals.${index}.enabled`}
                    control={control}
                    render={({ field }) => {
                        return(
                        <Checkbox
                          onCheckedChange={(checked) => {
                            field.onChange(checked === true)
                          }}
                          checked={field.value}
                         className="w-5 h-5 data-[state=checked]:bg-ignite500 data-[state=checked]:text-white"/>
                        )
                    }}  
                  />
                  <p className="text-gray100 text-sm">{weekDays[field.weekDay]}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Input 
                      type="time"
                      step={60}
                      disabled={intervals[index].enabled === false}
                      {...register(`intervals.${index}.startTime`)} />
                  <Input
                   type="time"
                   step={60}
                   disabled={intervals[index].enabled === false}
                   {...register(`intervals.${index}.endTime`)}
                   />
                   
                </div>
              </div>
            );
          })}
        </div>
        {errors.intervals && (
          <p className="text-white text-xs mb-4">{errors.intervals.message}</p>
        )}
        <Button
          className="bg-green-800 text-white hover:bg-green-500"
          type="submit"
          disabled={isSubmitting}
        >
          Próximo passo
          <ArrowRight />
        </Button>
      </form>
    </div>
  );
}
