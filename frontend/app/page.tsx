"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { produtosApi, Produto } from "@/services/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { ProdutoForm } from "@/components/ProdutoForm";
import { useRef } from "react";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState<Produto | undefined>(
    undefined
  );
  const toast = useRef<Toast>(null);
  const queryClient = useQueryClient();

  const {
    data: produtos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["produtos"],
    queryFn: produtosApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: produtosApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
      toast.current?.show({
        severity: "success",
        summary: "Sucesso",
        detail: "Produto criado com sucesso",
      });
      hideModal();
    },
    onError: (error) => {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: `Erro ao criar produto: ${error.message}`,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      produtosApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
      toast.current?.show({
        severity: "success",
        summary: "Sucesso",
        detail: "Produto atualizado com sucesso",
      });
      hideModal();
    },
    onError: (error) => {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: `Erro ao atualizar produto: ${error.message}`,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: produtosApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
      toast.current?.show({
        severity: "success",
        summary: "Sucesso",
        detail: "Produto excluído com sucesso",
      });
    },
    onError: (error) => {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: `Erro ao excluir produto: ${error.message}`,
      });
    },
  });

  const openNewModal = () => {
    setSelectedProduto(undefined);
    setModalVisible(true);
  };

  const openEditModal = (produto: Produto) => {
    setSelectedProduto(produto);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setSelectedProduto(undefined);
  };

  const handleSubmit = (data: any) => {
    if (selectedProduto) {
      updateMutation.mutate({ id: selectedProduto.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const confirmDelete = (produto: Produto) => {
    confirmDialog({
      message: `Tem certeza que deseja excluir o produto "${produto.nome}"?`,
      header: "Confirmação de exclusão",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      accept: () => deleteMutation.mutate(produto.id),
      acceptClassName: "p-button-danger",
      rejectClassName: "p-button-text mr-3",
    });
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar produtos</div>;

  return (
    <div className="container mx-auto p-4">
      <Toast ref={toast} />
      <ConfirmDialog />

      <div className="grid w-full mb-4 align-items-center">
        <div className="col-6">
          <h1 className="text-2xl font-bold">Gerenciamento de Produtos</h1>
        </div>
        <div className="col-6 text-right">
          <Button
            label="Novo Produto"
            icon="pi pi-plus"
            onClick={openNewModal}
            iconPos="right"
            severity="success"
            className="p-button p-component p-3"
            style={{ backgroundColor: "var(--blue-700)", color: "white" }}
          />
        </div>
      </div>

      <DataTable
        value={produtos}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        emptyMessage="Nenhum produto encontrado"
      >
        <Column field="id" header="ID" sortable style={{ width: "10%" }} />
        <Column field="nome" header="Nome" sortable style={{ width: "40%" }} />
        <Column
          field="preco"
          header="Preço"
          sortable
          style={{ width: "20%" }}
          body={(rowData) => formatCurrency(rowData.preco)}
        />
        <Column
          field="quantidade"
          header="Quantidade"
          sortable
          style={{ width: "15%" }}
        />
        <Column
          body={(rowData) => (
            <div className="flex gap-2 justify-content-center">
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-success p-button-text"
                onClick={() => openEditModal(rowData)}
                tooltip="Editar"
              />
              <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger p-button-text"
                onClick={() => confirmDelete(rowData)}
                tooltip="Excluir"
              />
            </div>
          )}
          style={{ width: "15%" }}
        />
      </DataTable>

      <Dialog
        visible={modalVisible}
        onHide={hideModal}
        header={selectedProduto ? "Editar Produto" : "Novo Produto"}
        modal
        className="p-fluid"
        style={{ width: "40vw" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      >
        <ProdutoForm
          produto={selectedProduto}
          onSubmit={handleSubmit}
          onCancel={hideModal}
        />
      </Dialog>
    </div>
  );
}
