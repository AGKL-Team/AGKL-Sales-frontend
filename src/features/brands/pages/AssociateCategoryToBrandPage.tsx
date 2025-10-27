import { useParams } from "react-router-dom";
import LoadingIndicator from "../../../shared/components/LoaderIndicator";
import Header from "../../dashboard/components/Header";
import AssociateCategoryToBrandForm from "../components/AssociateCategoryToBrandForm";
import { useGetBrand } from "../hooks/useGetBrand";

export default function AssociateCategoryToBrandPage() {
  const { id } = useParams<{ id: string }>();

  const brandId = id ? Number.parseInt(id, 10) : null;

  const { brand, isLoading } = useGetBrand(brandId!);

  return (
    <div
      className="theme-responsive"
      style={{
        minHeight: "100vh",
      }}
    >
      <Header />

      {isLoading && (
        <LoadingIndicator isLoading message="Cargando datos de la Marca..." />
      )}

      <section className="p-4">
        <h2>Asociar categoría a {brand?.name}</h2>

        <AssociateCategoryToBrandForm brand={brand!} />
      </section>
    </div>
  );
}
