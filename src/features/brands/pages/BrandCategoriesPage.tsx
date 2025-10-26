import { useNavigate, useParams } from "react-router-dom";
import LoadingIndicator from "../../../shared/components/LoaderIndicator";
import Header from "../../dashboard/components/Header";
import { useGetBrand } from "../hooks/useGetBrand";
import { useGetBrandCategories } from "../hooks/useGetBrandCategories";

export default function BrandCategoriesPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const brandId = id ? Number.parseInt(id, 10) : null;

  const { brand, isLoading: isLoadingBrand } = useGetBrand(brandId!);
  const { categories, isLoading: isLoadingCategories } =
    useGetBrandCategories(brandId);

  const associateNewCategory = () => {
    navigate(`/dashboard/brands/categories/${brandId}/associate`);
  };

  const deleteCategory = (categoryId: number) => {
    alert(
      `Aquí se borraría la categoría con ID ${categoryId} de la marca ${brand?.name}`
    );
  };

  return (
    <div className="theme-responsive" style={{ minHeight: "100vh" }}>
      <Header />

      {(isLoadingBrand || isLoadingCategories) && (
        <LoadingIndicator
          isLoading
          message="Recuperando Marca y sus Categorías..."
        />
      )}

      <section className="p-4">
        <h2>Categorías de {brand?.name}</h2>

        <div className="alert alert-success d-flex justify-content-between align-items-center col-lg-6 col-sm-12 mt-4">
          <span>
            Asocie una categoría a la marca <strong>{brand?.name}</strong>
          </span>
          <button className="btn btn-success" onClick={associateNewCategory}>
            Nuevo
          </button>
        </div>
        <table className="table theme-table table-hover mt-4">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteCategory(category.id)}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
