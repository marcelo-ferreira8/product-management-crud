"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Produto } from "@/services/api";

const produtoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  preco: z.number().positive("Preço deve ser um número positivo"),
  quantidade: z
    .number()
    .int()
    .min(0, "Quantidade deve ser maior ou igual a zero"),
});

type ProdutoFormData = z.infer<typeof produtoSchema>;

interface ProdutoFormProps {
  produto?: Produto;
  onSubmit: (data: ProdutoFormData) => void;
  onCancel: () => void;
}

export function ProdutoForm({ produto, onSubmit, onCancel }: ProdutoFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProdutoFormData>({
    defaultValues: {
      nome: produto?.nome || "",
      preco: produto?.preco || 0,
      quantidade: produto?.quantidade || 0,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
      <div className="field mb-4">
        <label htmlFor="nome" className="font-bold">
          Nome
        </label>
        <Controller
          name="nome"
          control={control}
          rules={{ required: "Nome é obrigatório" }}
          render={({ field, fieldState }) => (
            <>
              <InputText
                id={field.name}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                className={classNames({ "p-invalid": fieldState.error })}
              />
              {errors.nome && (
                <small className="p-error">{errors.nome.message}</small>
              )}
            </>
          )}
        />
      </div>

      <div className="field mb-4">
        <label htmlFor="preco" className="font-bold">
          Preço
        </label>
        <Controller
          name="preco"
          control={control}
          rules={{
            required: "Preço é obrigatório",
            min: { value: 0.01, message: "Preço deve ser positivo" },
          }}
          render={({ field, fieldState }) => (
            <>
              <InputNumber
                id={field.name}
                value={field.value}
                onValueChange={(e) => field.onChange(e.value)}
                mode="currency"
                currency="BRL"
                locale="pt-BR"
                className={classNames({ "p-invalid": fieldState.error })}
              />
              {errors.preco && (
                <small className="p-error">{errors.preco.message}</small>
              )}
            </>
          )}
        />
      </div>

      <div className="field mb-4">
        <label htmlFor="quantidade" className="font-bold">
          Quantidade
        </label>
        <Controller
          name="quantidade"
          control={control}
          rules={{
            required: "Quantidade é obrigatória",
            min: { value: 0, message: "Quantidade não pode ser negativa" },
          }}
          render={({ field, fieldState }) => (
            <>
              <InputNumber
                id={field.name}
                value={field.value}
                onValueChange={(e) => field.onChange(e.value)}
                className={classNames({ "p-invalid": fieldState.error })}
                showButtons
                min={0}
              />
              {errors.quantidade && (
                <small className="p-error">{errors.quantidade.message}</small>
              )}
            </>
          )}
        />
      </div>

      <div className="flex justify-content-center gap-2">
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={onCancel}
          className="p-button-text"
          type="button"
        />
        <Button label="Salvar" icon="pi pi-check" type="submit" />
      </div>
    </form>
  );
}
